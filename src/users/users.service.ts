import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { CONFIG } from '../core/constants/inject-tokens';
import { Config } from '../config/config.module';
import { Role } from './roles/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(CONFIG) private readonly config: Config,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const userModel = {
      email: userDto.email,
      passwordHash: userDto.password,
    } as User;

    return this.userModel.create(userModel);
  }

  async createAdmin() {
    const userModel = {
      email: this.config.createAdmin.adminName,
      passwordHash: this.config.createAdmin.adminPassword,
      role: Role.ADMIN,
    } as User;

    return this.userModel.create(userModel);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }
}
