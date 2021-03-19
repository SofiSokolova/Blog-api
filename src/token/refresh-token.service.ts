import { DAY_IN_MILLISECONDS } from '../../constants';
import { randomHash } from 'src/helper/randomHash';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RefreshTokensService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  public async createRefreshToken(userId: number): Promise<string> {
    await this.cache.set(String(userId), randomHash(), {
      ttl: DAY_IN_MILLISECONDS,
    });

    return await this.findTokenByUserId(userId);
  }

  public async findTokenByUserId(userId: number): Promise<string> {
    return await this.cache.get(String(userId));
  }
}
