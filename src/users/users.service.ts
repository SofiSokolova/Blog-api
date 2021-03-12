import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '$2b$10$XY0CV4eiJSq6w9.WsV2DLunrQteiKppeA65FpFCNQamBCojHX4c1K',
    },
    {
      userId: 2,
      username: 'maria',
      password: '$2b$10$4lLB7gGs4sq1uvydif4vI.dq0mrMyv/qPC1blQoTpTSFfYDwrvYgi',
    },
  ];

  async findOne(username: string): Promise<any> {
    return this.users.find((user) => user.username === username);
  }
}
