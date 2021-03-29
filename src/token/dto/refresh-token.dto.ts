import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly tokenHash: string;
}
