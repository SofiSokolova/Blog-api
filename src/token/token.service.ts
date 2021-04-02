import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { User } from '../users/entities/user.entity';
import { Config } from '../config/config.module';
import { CONFIG } from '../core/constants/inject-tokens';
import {
  ACCESS_TOKEN_KEY,
  CONFIRM_TOKEN_KEY,
  DAY_IN_MILLISECONDS,
  DAY_IN_SECONDS,
  ONE_HOUR_IN_MILLISECONDS,
  ONE_HOUR_IN_SECONDS,
  REFRESH_TOKEN_KEY,
} from '../core/constants/constants';

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
    const accessToken = await this.findTokenByKey(
      `${decoded.id}${ACCESS_TOKEN_KEY}`,
    );
    if (!accessToken || accessToken !== token) {
      throw new UnauthorizedException();
    }
    if (!decoded) {
      throw new UnauthorizedException();
    }
    return decoded;
  }

  async getConfirmToken(userEmail: string) {
    const token = this.jwtService.sign(
      {
        email: userEmail,
      },
      {
        secret: this.config.auth.secretKey,
        expiresIn: DAY_IN_SECONDS,
      } as JwtSignOptions,
    );
    await this.setToken(
      token,
      `${userEmail}${CONFIRM_TOKEN_KEY}`,
      DAY_IN_MILLISECONDS,
    );
    return token;
  }

  async getTokens(user: User) {
    const accessToken = await this.createJwtToken(user, ONE_HOUR_IN_SECONDS);
    const refreshToken = await this.createJwtToken(user, DAY_IN_SECONDS);
    await this.setToken(
      accessToken,
      `${user.id}${ACCESS_TOKEN_KEY}`,
      ONE_HOUR_IN_MILLISECONDS,
    );
    await this.setToken(
      refreshToken,
      `${user.id}${REFRESH_TOKEN_KEY}`,
      DAY_IN_MILLISECONDS,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async deleteTokenByKey(key: string): Promise<void> {
    await this.cache.del(key);
  }

  async findTokenByKey(key: string): Promise<string> {
    return this.cache.get(key);
  }

  private async createJwtToken(user: User, expInTime: number) {
    return this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
      },
      {
        secret: this.config.auth.secretKey,
        expiresIn: expInTime,
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

    return this.findTokenByKey(key);
  }
}
