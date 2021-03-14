import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { RefreshTokensRepository } from './refresh-token/refresh-tokens.repository';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensRepository: RefreshTokensRepository,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = user && (await bcrypt.compare(pass, user.passwordHash));
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);

    if (!user){
      throw new UnauthorizedException();
    }
    const payload = {
      email: (user as any).dataValues.email,
      id: (user as any).dataValues.id,
    };
  //  console.log(user.email)
   // console.log((user as any).dataValues.id);
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: (
        await this.refreshTokensRepository.createRefreshToken(
          (user as any).dataValues.id,
        )
      ).tokenHash,
    };
  }
}
