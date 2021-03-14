import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { RefreshTokensRepository } from './refresh-token/refresh-tokens.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './refresh-token/refresh-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
    SequelizeModule.forFeature([RefreshToken]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokensRepository],
  exports: [AuthService],
})
export class AuthModule {}
