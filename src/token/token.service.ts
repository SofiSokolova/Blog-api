import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { DAY_IN_MILLISECONDS, ONE_HOUR_IN_MILLISECONDS } from '../constants';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User } from '../users/entities/user.entity';
import { Config } from '../config/config.module';
import { CONFIG } from '../inject-tokens';


@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @Inject(CONFIG) private readonly config: Config,
  ) {}

  async verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.config.auth.secretKey,
    });
  }

  async validateAccessToken(token: string): Promise<any> {
    const decoded = await this.verifyToken(token);
    const accessToken = await this.findTokenByKey(`${decoded.id}_access`);
    if (!accessToken || accessToken !== token) {
      throw new UnauthorizedException();
    }
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return decoded;
  }

  async getTokens(user: User) {
    const accessToken = await this.createJwtToken(
      user,
      ONE_HOUR_IN_MILLISECONDS / 1000,
    );
    const refreshToken = await this.createJwtToken(user, DAY_IN_MILLISECONDS);
    await this.setToken(
      accessToken,
      `${user.id}_access`,
      ONE_HOUR_IN_MILLISECONDS / 1000,
    );
    await this.setToken(
      refreshToken,
      `${user.id}_refresh`,
      DAY_IN_MILLISECONDS,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async findTokenByKey(key: string): Promise<string> {
    return await this.cache.get(key);
  }

  private async createJwtToken(user: User, expInTime: number) {
    const expiration = new Date();
    const expIn = expiration.setTime(expiration.getTime() + expInTime);
    return this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
      },
      {
        secret: this.config.auth.secretKey,
        expiresIn: expIn,
      } as JwtSignOptions,
    );
  }

  private async setToken(
    token: string,
    key: string,
    expInTime: number,
  ): Promise<string> {
    await this.cache.set(key, token, {
      ttl: expInTime,
    });

    return await this.findTokenByKey(key);
  }
}
