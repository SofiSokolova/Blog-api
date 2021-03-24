import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from 'src/cache/cache.module';
import { TokenService } from './token.service';

@Module({
  imports: [CacheModule, ConfigModule.forRoot(), JwtModule.register({})],
  controllers: [],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
