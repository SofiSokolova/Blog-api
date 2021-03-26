import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CacheModule } from '../cache/cache.module';
import { TokenModule } from '../token/token.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UsersModule,
    TokenModule,
    CacheModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
