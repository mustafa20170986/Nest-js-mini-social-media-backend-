import { IsNotEmpty, IsString } from 'class-validator';

export class updtpost {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;
}
