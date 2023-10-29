import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class  LoginDto {
  
    @ApiProperty({ name: 'username' })
    @IsEmail({},{message:"Email will be like test@example.com"})
    username:string;

    @ApiProperty({ name: 'password' })
    @IsString({message:"the password will be string"})
    password:string;
}