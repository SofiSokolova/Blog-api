import { IsString } from 'class-validator';

export class CreateRefreshTokenDto {
  readonly userId: number;
  @IsString()
  readonly tokenHash: string;
}
