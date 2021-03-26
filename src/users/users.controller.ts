import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './roles/role.enum';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Roles(Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return 'Hi, Admin';
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get('post')
  getPost(@Request() req) {
    return 'Hi, user';
  }
}
