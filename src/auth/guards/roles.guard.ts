import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';
import { Roles, ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from 'src/users/roles/role.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    //@Inject(forwardRef(() => UsersService))
   // private readonly userService: UsersService,
   // private readonly jwtService: JwtService,
  ) {}
 
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

/*     const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }); */
  //  const { user } = context.switchToHttp().getRequest();
 //   return requiredRoles.some((role) => user.roles?.includes(role));

  //  const user = await this.userService.findOneById(user.id);

/*     return await this.userService.findOneById(user.id).pipe(
      map((user: User) => {
        const Roles = () => roles.indexOf(user.role) > -1;
        const hasPermission: boolean = false;

        if (Roles()) {
          hasPermission = true;
        }
        return user && hasPermission;
      }),
    ); */
  }
}
