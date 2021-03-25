import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { Role } from 'src/users/roles/role.enum';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const accessToken = request.headers.authorization.replace('Bearer ', '');
    const decoded = await this.tokenService.decodeToken(accessToken);
    const user = await this.usersService.findOneById(decoded.id);
    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
