import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateRefreshTokenDto } from '../refresh-token/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshToken: CreateRefreshTokenDto) {
    return this.authService.updateTokens(refreshToken);
  }
}
