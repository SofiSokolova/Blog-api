import { Injectable } from '@nestjs/common'
import { User } from '../../users/entities/user.entity'
import { RefreshToken } from './refresh-token.entity'
import * as crypto from 'crypto'

@Injectable()
export class RefreshTokensRepository {
  public async createRefreshToken(
    userId: number,
    ttl: number = 1000 * 60 * 60 * 24,
  ): Promise<RefreshToken> {
    const token = new RefreshToken();
    token.userId = userId;
    token.isRevoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    token.tokenHash = crypto.randomBytes(32).toString('base64');

    return token.save();
  }

  public async findTokenByUserId(userId: number): Promise<RefreshToken | null> {

    return RefreshToken.findOne({ where: { userId } });
  }

}
