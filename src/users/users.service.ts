import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { USERS_REPOSITORY } from '../constants';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private usersRepository: typeof User) {}

  async create(user: CreateUserDto): Promise<User> {
    const userModel = {
      email: user.email,
      passwordHash: user.password,
    } as User;

    return await this.usersRepository.create<User>(userModel);
/*     try {
   const userModel = new User();
      userModel.email = user.email;
      userModel.passwordHash = user.password;
    //  console.log(userModel)
   //  return await this.usersRepository.create<User>(userModel);
      return await this.usersRepository.create<User>(userModel);
    } catch (err) {
      console.error(err);
    } */
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.usersRepository.findOne<User>({ where: { id } });
  }

  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: '$2b$10$XY0CV4eiJSq6w9.WsV2DLunrQteiKppeA65FpFCNQamBCojHX4c1K',
    },
    {
      userId: 2,
      email: 'maria',
      password: '$2b$10$4lLB7gGs4sq1uvydif4vI.dq0mrMyv/qPC1blQoTpTSFfYDwrvYgi',
    },
  ];
}

