import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor() { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {

    return req.user;
  }
}
