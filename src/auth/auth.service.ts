import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/entities/user.entity';
import { CreateRefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) { }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.tokenService.getTokens(user);
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = user && (await bcrypt.compare(pass, user.passwordHash));
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async updateTokens(refreshToken: CreateRefreshTokenDto) {
    const decoded = this.tokenService.decodeToken(refreshToken.tokenHash);
    const token = await this.tokenService.findRefreshTokenByUserId(decoded.id);
    if (!token) {
      throw new NotFoundException();
    }
    if (token !== refreshToken.tokenHash) {
      throw new BadRequestException();
    }
    const user = await this.usersService.findOneById(decoded.id);
    return await this.tokenService.getTokens(user);
  }
}
