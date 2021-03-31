import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token hash of the User',
  })
  @IsNotEmpty()
  @IsString()
  readonly tokenHash: string;
}
