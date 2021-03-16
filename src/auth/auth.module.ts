import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport-strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-strategy/jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from '../refresh-token/refresh-token.entity';
import { AuthController } from './auth.controller';
import { RefreshTokensService } from '../refresh-token/refresh-token.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    SequelizeModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokensService],
  exports: [AuthService],
})
export class AuthModule {}
