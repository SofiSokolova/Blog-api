import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './roles/role.enum';

@ApiBearerAuth('JWT')
@UseGuards(AuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  @ApiOperation({ summary: 'Profile' })
  @ApiOkResponse({
    status: 200,
  })
  @ApiResponse({ status: 401, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: 'Post' })
  @ApiOkResponse({
    status: 200,
  })
  @ApiResponse({ status: 401, description: 'Bad Request' })
  @Roles(Role.ADMIN, Role.USER)
  @Get('post')
  getPost(@Request() req) {
    return req.user;
  }
}
