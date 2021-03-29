import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from '../token/token.service';
import { User } from '../users/entities/user.entity';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async createUser(userDTO: CreateUserDto) {
    return await this.usersService.create(userDTO);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);

    return await this.tokenService.getTokens(user);
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
      `${decoded.id}_refresh`,
    );
    if (!refreshToken || refreshToken !== refreshTokenDto.tokenHash) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findOneById(decoded.id);

    return this.tokenService.getTokens(user);
  }
}
