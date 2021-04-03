/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from '../../decorators/match.decorator';
import {
  passDoesNotMatch,
  passTooWeak,
} from '../../core/constants/error-messages';
import { REG_EXP_FOR_PASS_VALIDATION } from '../../core/constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class ResetForgotPasswordDto {
  @ApiProperty({
    example: 'tokenHash: tokenStr',
  })
  @IsString()
  readonly tokenHash: string;

  @ApiProperty({
    example: 'passwOrd3',
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
    example: 'passwOrd3',
    description: 'The new password confirm of the User',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('newPass', { message: passDoesNotMatch })
  readonly newPassConfirm: string;
}
