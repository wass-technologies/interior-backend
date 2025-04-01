import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey: process.env.JWT_SECRET || 'fstfswghjsbsyuwghwsbxsbgfxtws',
    })
  }

  async validate(payload) {
    const user = await this.authService.validate(payload.id);
    if (!user) {
      throw new UnauthorizedException('Authentication failed.');
    }
    return user;
  }
}
