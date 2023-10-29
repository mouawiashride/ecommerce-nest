import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createUserDto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { LoginUserDto } from './dto/LoginUserDto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body()
    userData:LoginUserDto,
    @Request() req: any,
  ) {
    return await this.authService.login(req.user);
  }

  // @Post('register')
  // async registerUser(@Body() createUserDto: CreateUserDto) {
  //   return await this.userService.create(createUserDto);
  // }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
