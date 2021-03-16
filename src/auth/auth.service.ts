import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateRefreshTokenDto } from '../refresh-token/refresh-token.dto';
import { RefreshTokensService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokensService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = user && (await bcrypt.compare(pass, user.passwordHash));
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const { passwordHash, ...result } = user; //the problem is here

    return result;
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: (user as any).dataValues.email,
      id: (user as any).dataValues.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.refreshTokenService.createRefreshToken(
        (user as any).dataValues.id,
      ),
    };
  }

  async updateTokens(tokenDto: CreateRefreshTokenDto) {
    const token = await this.refreshTokenService.findTokenByUserId(
      tokenDto.userId,
    );

    if (!token) {
      throw new NotFoundException();
    }
    if ((token as any).dataValues.tokenHash !== tokenDto.tokenHash) {
      throw new BadRequestException();
    }

    const user = await this.usersService.findOneById(tokenDto.userId);
    const payload = {
      id: tokenDto.userId,
      email: (user as any).dataValues.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: await this.refreshTokenService.createRefreshToken(
        tokenDto.userId,
      ),
    };
  }
}
