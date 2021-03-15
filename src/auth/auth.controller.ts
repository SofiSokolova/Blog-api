import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateRefreshTokenDto } from './refresh-token/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    ) { }

  @Post('register')
  async create(@Body() data: CreateUserDto) {
    await this.authService.create(data);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginUserDto) {

    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshToken: CreateRefreshTokenDto ){

    return this.authService.updateTokens(refreshToken)

  }

}