import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport-strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshTokensService } from '../refresh-token/refresh-token.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    UsersModule,
    CacheModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokensService],
  exports: [AuthService],
})
export class AuthModule {}
