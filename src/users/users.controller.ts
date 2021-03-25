import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './roles/role.enum';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @UseGuards(RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('post')
  getPost(@Request() req) {
    return req.user;
  }
}
