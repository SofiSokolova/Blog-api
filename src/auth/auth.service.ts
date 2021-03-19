import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return await this.tokenService.createTokens((user as any).dataValues.id);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = user && (await bcrypt.compare(pass, user.passwordHash));
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const { passwordHash, ...result } = user; //the problem is here

    return result;
  }
}
