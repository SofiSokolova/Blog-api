import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import {
  passDoesNotMatch,
  passTooLong,
  passTooShort,
  passTooWeak,
} from '../../core/constants/error-messages';
import { REG_EXP_FOR_PASS_VALIDATION } from '../../core/constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'top.user@gmail.com',
    description: 'The email of the User',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'passwOrd1',
    description: 'The password of the User',
  })
  @IsString()
  @MinLength(8, { message: passTooShort })
  @MaxLength(20, { message: passTooLong })
  @Matches(REG_EXP_FOR_PASS_VALIDATION, {
    message: passTooWeak,
  })
  readonly password: string;

  @ApiProperty({
    example: 'passwOrd1',
    description: 'The password confirm of the User',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: passDoesNotMatch })
  readonly passwordConfirm: string;
}
