import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenService } from 'src/token/token.service';
import { CreateRefreshTokenDto } from 'src/token/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async create(@Body() data: CreateUserDto) {
    await this.usersService.create(data);
  }

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshToken: CreateRefreshTokenDto) {
    return this.authService.updateTokens(refreshToken);
  }
}
