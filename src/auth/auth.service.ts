import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RefreshTokensRepository } from './refresh-token/refresh-tokens.repository';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRefreshTokenDto } from './refresh-token/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokensRepository: RefreshTokensRepository,
    @InjectModel(User) private userModel: typeof User,

  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const userModel = {
      email: user.email,
      passwordHash: user.password,
    } as User;

    return await this.userModel.create<User>(userModel);
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

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto.email, userDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: (user as any).dataValues.email,
      id: (user as any).dataValues.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: (
        await this.refreshTokensRepository.createRefreshToken(
          (user as any).dataValues.id,
        )
      ).tokenHash,
    };
  }

async updateTokens(tokenDto: CreateRefreshTokenDto){
  const token = await this.refreshTokensRepository.findTokenByUserId(tokenDto.userId)

  console.log(token)
  if(!token){
     throw new NotFoundException()
  }
  if ((token as any).dataValues.tokenHash !== tokenDto.tokenHash){
   // console.log((token as any).dataValues.tokenHash)
    throw new BadRequestException()
  }

  const user = await this.usersService.findOneById(tokenDto.userId);
  const payload = {
    id: tokenDto.userId,
    email: (user as any).dataValues.email,
  };

  return {
    access_token: this.jwtService.sign(payload),
    refresh_token: (
      await this.refreshTokensRepository.createRefreshToken(
        tokenDto.userId,
      )
    ).tokenHash,
  };
  }

}
