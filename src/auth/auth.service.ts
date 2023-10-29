import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private  jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithEmail(email);

    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      id:user.id,
      username: user.email,
      sub: {
        name: user.name,
      },
    };
    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
