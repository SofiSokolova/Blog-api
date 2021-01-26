import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
  
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);
      const isMatch = user && await bcrypt.compare(pass, user.password);
      console.log(isMatch)
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  }
