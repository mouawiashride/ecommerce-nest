
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {

  @ApiProperty({ name: 'username',default:"123@gmail.com" })
  @IsEmail()
  username: string;

  @ApiProperty({ name: 'password',default:"12345678"  })
  @IsString()
  password: string;

}


