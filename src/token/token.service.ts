import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ONE_HOUR_IN_SECONDS } from '../../constants';
import { User } from 'src/users/entities/user.entity';
import { DAY_IN_MILLISECONDS } from '../../constants';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Config } from 'src/config.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('config') private readonly config: Config,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) { }

  async decodeToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: this.config.secretOrKey,
    });
  }

  async validateAccessToken(token: string): Promise<any> {
    const decoded = this.decodeToken(token);

    if (!decoded) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async createJwtToken(user: User, expInTime: number) {
    const expiration = new Date();
    const expIn = expiration.setTime(expiration.getTime() + expInTime);
    return this.jwtService.sign(
      {
        id: user.id,
        exp: expIn,
        role: user.role,
      },
      { secret: this.config.secretOrKey },
    );
  }

  async getTokens(user: User) {
    const accessToken = await this.createJwtToken(user, ONE_HOUR_IN_SECONDS);
    const refreshToken = await this.createJwtToken(user, DAY_IN_MILLISECONDS);
    await this.setRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  public async setRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<string> {
    await this.cache.set(String(userId), refreshToken, {
      ttl: DAY_IN_MILLISECONDS,
    });

    return await this.findRefreshTokenByUserId(userId);
  }

  public async findRefreshTokenByUserId(userId: number): Promise<string> {
    return await this.cache.get(String(userId));
  }
}
