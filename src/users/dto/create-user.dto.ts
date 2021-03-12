import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';

export class CreateUserDto {
  @IsString({ message: 'not string' })
  @MinLength(4, { message: 'too short' })
  @MaxLength(20, { message: 'too long' })
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'too short' })
  @MaxLength(20, { message: 'too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'does not match' })
  passwordConfirm: string;

  readonly confirmed: boolean;
}
