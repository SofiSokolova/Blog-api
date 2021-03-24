import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from 'src/cache/cache.module';
import { configFactory } from 'src/config.service';
import { TokenService } from './token.service';

@Module({
  imports: [CacheModule, JwtModule.register({})],
  controllers: [],
  providers: [
    TokenService,
    {
      provide: 'config',
      useValue: configFactory(),
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
