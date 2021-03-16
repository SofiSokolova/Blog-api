import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
  ) {}

  public async createRefreshToken(
    userId: number,
    ttl: number = 1000 * 60 * 60 * 24,
  ): Promise<string> {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    const token = {
      userId: userId,
      isRevoked: false,
      expires: expiration,
      tokenHash: crypto.randomBytes(32).toString('base64'),
    } as RefreshToken;

    const [{ tokenHash }] = await this.refreshTokenModel.upsert(token);

    return tokenHash;
  }

  public async findTokenByUserId(userId: number): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ where: { userId } });
  }
}
