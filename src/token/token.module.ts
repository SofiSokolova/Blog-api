import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '../cache/cache.module';
import { ConfigModule } from '../config/config.module';
import { TokenService } from './token.service';

@Module({
  imports: [ConfigModule, CacheModule, JwtModule.register({})],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
