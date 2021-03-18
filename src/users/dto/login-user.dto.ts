import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { REG_EXP_FOR_PASS_VALIDATION } from '../../../constants';
import {
  passTooLong,
  passTooShort,
  passTooWeak,
} from '../../../error-messages';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: passTooShort })
  @MaxLength(20, { message: passTooLong })
  @Matches(REG_EXP_FOR_PASS_VALIDATION, {
    message: passTooWeak,
  })
  readonly password: string;
}
