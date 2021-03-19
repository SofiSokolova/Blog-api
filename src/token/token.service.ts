import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ONE_HOUR_IN_SECONDS } from '../../constants';
import { CreateRefreshTokenDto } from 'src/token/dto/refresh-token.dto';
import { RefreshTokensService } from 'src/token/refresh-token.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokensService,
  ) {}

  async validateAccessToken(token: string): Promise<any> {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!decoded) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async createTokens(userId: number) {
    const expiration = new Date();
    const expIn = expiration.setTime(
      expiration.getTime() + ONE_HOUR_IN_SECONDS,
    );

    return {
      userId: userId,
      access_token: this.jwtService.sign(
        {
          id: userId,
          exp: expIn,
        },
        { secret: process.env.JWT_SECRET },
      ),
      refresh_token: await this.refreshTokenService.createRefreshToken(userId),
    };
  }

  async updateTokens(tokenDto: CreateRefreshTokenDto) {
    const token = await this.refreshTokenService.findTokenByUserId(
      tokenDto.userId,
    );
    if (!token) {
      throw new NotFoundException();
    }
    if (token !== tokenDto.tokenHash) {
      throw new BadRequestException();
    }
    return await this.createTokens(tokenDto.userId);
  }
}
