import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from '../token/token.service';
import { User } from '../users/entities/user.entity';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  CONFIRM_TOKEN_KEY,
  DAY_IN_MILLISECONDS,
  DAY_IN_SECONDS,
  FORGOT_TOKEN_KEY,
  ONE_HOUR_IN_MILLISECONDS,
  REFRESH_TOKEN_KEY,
} from '../core/constants/constants';
import { ConfirmTokenDto } from '../token/dto/confirm-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetForgotPasswordDto } from './dto/reset-forgot-password.dto';
import { IAuthTokenResponse } from '../token/interfaces';
import { MailService } from '../core/mailer.service';
import { notConfirmedEmail, wrongPass } from '../core/constants/error-messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async createUser(userDTO: CreateUserDto): Promise<void> {
    const { email } = userDTO;

    const tokenConfirm = await this.tokenService.createJwtToken(
      { email },
      DAY_IN_SECONDS,
    );

    await this.tokenService.setToken(
      tokenConfirm,
      `${email}${CONFIRM_TOKEN_KEY}`,
      DAY_IN_MILLISECONDS,
    );
    await this.mailService.sendMail(email, tokenConfirm);

    await this.usersService.create(userDTO);
  }

  async login(userDto: LoginUserDto): Promise<IAuthTokenResponse> {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user.confirmed) {
      throw new UnauthorizedException(notConfirmedEmail);
    }
    return this.tokenService.getTokens(user);
  }

  private async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async updateTokens({
    tokenHash,
  }: CreateRefreshTokenDto): Promise<IAuthTokenResponse> {
    const { id } = await this.tokenService.verifyToken(tokenHash);
    const redisToken = await this.tokenService.findTokenByKey(
      `${id}${REFRESH_TOKEN_KEY}`,
    );
    if (!redisToken || redisToken !== tokenHash) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneById(id);

    return this.tokenService.getTokens(user);
  }

  //TODO: think about how to transfer duplicate lines to another function

  async confirmEmail(confirmTokenDto: ConfirmTokenDto): Promise<void> {
    const { confirmToken } = confirmTokenDto;

    const { email } = await this.tokenService.verifyToken(confirmToken);
    const redisToken = await this.tokenService.findTokenByKey(
      `${email}${CONFIRM_TOKEN_KEY}`,
    );
    if (!redisToken || redisToken !== confirmToken) {
      throw new UnauthorizedException();
    }
    await this.tokenService.deleteTokenByKey(`${email}${CONFIRM_TOKEN_KEY}`);
    const user = await this.usersService.findOneByEmail(email);
    await user.update({ confirmed: true });
  }

  async changePassword(changePassDto: ChangePasswordDto): Promise<void> {
    const { email, previousPass, newPassConfirm } = changePassDto;

    const user = await this.validateUser(email, previousPass);
    if (!user) {
      throw new UnauthorizedException(wrongPass);
    }
    await user.update({ passwordHash: newPassConfirm });
  }

  async forgotPassword(forgotPassDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findOneByEmail(forgotPassDto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { email } = user;
    const token = await this.tokenService.createJwtToken(
      { email },
      DAY_IN_SECONDS,
    );
    await this.mailService.sendMail(email, token);
    await this.tokenService.setToken(
      token,
      `${email}${FORGOT_TOKEN_KEY}`,
      ONE_HOUR_IN_MILLISECONDS,
    );
  }

  async resetPassword(
    resetForgotPassDto: ResetForgotPasswordDto,
  ): Promise<void> {
    const { tokenHash, newPassConfirm } = resetForgotPassDto;
    const { email } = await this.tokenService.verifyToken(tokenHash);
    const redisToken = await this.tokenService.findTokenByKey(
      `${email}${FORGOT_TOKEN_KEY}`,
    );
    if (!redisToken || redisToken !== tokenHash) {
      console.log('tut');
      throw new UnauthorizedException();
    }
    await this.tokenService.deleteTokenByKey(`${email}${FORGOT_TOKEN_KEY}`);
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    await user.update({ passwordHash: newPassConfirm });
  }
}
