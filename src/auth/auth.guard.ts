import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (
      !request.headers.authorization ||
      request.headers.authorization.replace(/ [\s\S]+/, '') !== 'Bearer'
    ) {
      throw new UnauthorizedException();
    }

    const accessToken = request.headers.authorization.replace('Bearer ', '');
    return this.tokenService.validateAccessToken(accessToken);
  }
}
