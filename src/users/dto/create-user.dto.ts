import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import { REG_EXP_FOR_PASS_VALIDATION } from '../../../constants';
import {
  passDoesNotMatch,
  passTooLong,
  passTooShort,
  passTooWeak,
} from '../../../error-messages';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: passTooShort })
  @MaxLength(20, { message: passTooLong })
  @Matches(REG_EXP_FOR_PASS_VALIDATION, {
    message: passTooWeak,
  })
  readonly password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: passDoesNotMatch })
  readonly passwordConfirm: string;
}
