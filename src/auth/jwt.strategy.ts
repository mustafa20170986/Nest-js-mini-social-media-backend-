import { PassportStrategy } from '@nestjs/passport';
//import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class jwtstr extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'i love you emu',
    });
  }
  validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
