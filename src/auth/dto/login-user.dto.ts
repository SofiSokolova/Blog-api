import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { REG_EXP_FOR_PASS_VALIDATION } from '../../core/constants/constants';
import {
  passTooLong,
  passTooShort,
  passTooWeak,
} from '../../core/constants/error-messages';

export class LoginUserDto {
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
}
