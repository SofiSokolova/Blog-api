import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user, 'kek';
  }
}
