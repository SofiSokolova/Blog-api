import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(userModel): Promise<User> {
    return this.userModel.create(userModel);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }
}
