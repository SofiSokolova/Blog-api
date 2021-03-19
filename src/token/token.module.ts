import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from 'src/cache/cache.module';
import { RefreshTokensService } from 'src/token/refresh-token.service';
import { TokenService } from './token.service';

@Module({
  imports: [CacheModule, ConfigModule.forRoot(), JwtModule.register({})],
  controllers: [],
  providers: [TokenService, RefreshTokensService],
  exports: [TokenService],
})
export class TokenModule {}
