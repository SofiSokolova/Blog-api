import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { InjectModel } from '@nestjs/sequelize';
import { dayInMilliseconds } from '../../constants';
import { randomHash } from 'src/helper/randomHash';

@Injectable()
export class RefreshTokensService {
  constructor(
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
  ) {}

  public async createRefreshToken(
    userId: number,
    ttl: number = dayInMilliseconds,
  ): Promise<string> {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    const randomtokenHash = await randomHash();
    const token = {
      userId: userId,
      isRevoked: false,
      expires: expiration,
      tokenHash: randomtokenHash,
    } as RefreshToken;
    const [{ tokenHash }] = await this.refreshTokenModel.upsert(token);

    return tokenHash;
  }

  public async findTokenByUserId(userId: number): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ where: { userId } });
  }
}
