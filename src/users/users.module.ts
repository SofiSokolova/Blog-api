import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
//import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
//import { User, UserSchema } from './schemas/user.entity';

@Module({
  imports: [
    DatabaseModule,
    SequelizeModule.forFeature([User]),
    //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
