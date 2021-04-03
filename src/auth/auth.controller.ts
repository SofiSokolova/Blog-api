import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateRefreshTokenDto } from '../token/dto/refresh-token.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConfirmTokenDto } from '../token/dto/confirm-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetForgotPasswordDto } from './dto/reset-forgot-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({
    description: 'Create user successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('signup')
  async create(@Body() user: CreateUserDto) {
    await this.authService.createUser(user);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: 'accessTokenStr',
        refreshToken: 'refreshTokenStr',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiOkResponse({
    schema: {
      example: {
        accessToken: 'accessTokenStr',
        refreshToken: 'refreshTokenStr',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('refresh')
  async refreshTokens(@Body() refreshToken: CreateRefreshTokenDto) {
    return this.authService.updateTokens(refreshToken);
  }

  @ApiOperation({ summary: 'Confirm email' })
  @ApiOkResponse({ description: 'Confirmed successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('confirm/email')
  async confirmEmail(@Body() confirmToken: ConfirmTokenDto) {
    return this.authService.confirmEmail(confirmToken);
  }

  @ApiOperation({ summary: 'Change password' })
  @ApiOkResponse({ description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('changepass')
  async changePassword(@Body() changePassDto: ChangePasswordDto) {
    return this.authService.changePassword(changePassDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('forgotpass')
  async forgotPassword(@Body() forgotPassDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPassDto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({ description: 'Request has been sent' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('resetpass')
  async resetForgotPassword(
    @Body() resetForgotPassDto: ResetForgotPasswordDto,
  ) {
    return this.authService.resetPassword(resetForgotPassDto);
  }
}
