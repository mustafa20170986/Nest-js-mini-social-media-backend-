import { IsString, IsNotEmpty } from 'class-validator';

export class createuser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  email!: string;
}
