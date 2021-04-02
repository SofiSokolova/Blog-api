import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from '../token/token.service';
import { User } from '../users/entities/user.entity';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CONFIRM_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../core/constants/constants';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfirmTokenDto } from '../token/dto/confirm-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    private readonly mailerService: MailerService,
  ) {}

  async createUser(userDTO: CreateUserDto) {
    const tokenConfirm = await this.tokenService.getConfirmToken(userDTO.email);
    await this.mailerService.sendMail({
      to: `${userDTO.email}`, // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: `${tokenConfirm}`, // plaintext body
    });
    return this.usersService.create(userDTO);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);

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

  async updateTokens(refreshTokenDto: CreateRefreshTokenDto) {
    const decoded = await this.tokenService.verifyToken(
      refreshTokenDto.tokenHash,
    );
    const refreshToken = await this.tokenService.findTokenByKey(
      `${decoded.id}${REFRESH_TOKEN_KEY}`,
    );
    if (!refreshToken || refreshToken !== refreshTokenDto.tokenHash) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneById(decoded.id);

    return this.tokenService.getTokens(user);
  }

  async confirmEmail(confirmTokenDto: ConfirmTokenDto) {
    const decoded = await this.tokenService.verifyToken(
      confirmTokenDto.confirmToken,
    );
    const confirmToken = await this.tokenService.findTokenByKey(
      `${decoded.email}${CONFIRM_TOKEN_KEY}`,
    );
    if (!confirmToken || confirmToken !== confirmTokenDto.confirmToken) {
      throw new UnauthorizedException();
    }
    await this.tokenService.deleteTokenByKey(confirmToken);
    const user = await this.usersService.findOneByEmail(decoded.email);
    user.confirmed = true;
    user.save();
  }
}
