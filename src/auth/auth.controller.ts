import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() user: CreateUserDto) {
    await this.authService.createUser(user);
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
