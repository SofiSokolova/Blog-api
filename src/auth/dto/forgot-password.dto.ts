/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'top.user@gmail.com',
    description: 'The email of the User',
  })
  @IsEmail()
  readonly email: string;
}
