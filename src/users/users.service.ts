import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(user: CreateUserDto): Promise<User> {
    const userModel = {
      email: user.email,
      passwordHash: user.password,
    } as User;

    return await this.userModel.create(userModel);
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }
}
