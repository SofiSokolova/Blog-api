/* eslint-disable @typescript-eslint/no-magic-numbers */
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

export class ChangePasswordDto {
  @ApiProperty({
    example: 'top.user@gmail.com',
    description: 'The email of the User',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'passwOrd1',
    description: 'The previous password of the User',
  })
  @IsString()
  @MinLength(8, { message: passTooShort })
  @MaxLength(20, { message: passTooLong })
  readonly previousPass: string;

  @ApiProperty({
    example: 'passwOrd2',
    description: 'The new password of the User',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(REG_EXP_FOR_PASS_VALIDATION, {
    message: passTooWeak,
  })
  readonly newPass: string;

  @ApiProperty({
    example: 'passwOrd2',
    description: 'The new password confirm of the User',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('newPass', { message: passDoesNotMatch })
  readonly newPassConfirm: string;
}
