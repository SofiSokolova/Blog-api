import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokenService } from '../token/token.service';
import { User } from '../users/entities/user.entity';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role } from '../users/roles/role.enum';
import { Config } from '../config/config.module';
import { CONFIG } from '../../constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    @Inject(CONFIG) private readonly config: Config,
  ) {}

  async createUser(user: CreateUserDto) {
    const userModel = {
      email: user.email,
      passwordHash: user.password,
    } as User;

    return await this.usersService.create(userModel);
  }

  async createAdmin() {
    const userModel = {
      email: this.config.adminName,
      passwordHash: this.config.adminPassword,
      role: Role.ADMIN,
    };

    return await this.usersService.create(userModel);
  }

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
    const decoded = await this.tokenService.decodeToken(refreshToken.tokenHash);
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
