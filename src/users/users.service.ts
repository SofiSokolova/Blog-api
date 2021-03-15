import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class UsersService {
constructor(@InjectModel(User) private userModel: typeof User) { }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }
}
