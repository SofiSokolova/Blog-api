import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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
      return this.users.find(user => user.username === username);
    }
  }
