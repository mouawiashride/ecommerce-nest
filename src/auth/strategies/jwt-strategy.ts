import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'dotenv';
config();
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.jwt_secret,
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username,id:payload.id };
  }
}
