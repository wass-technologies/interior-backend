import { JwtService } from '@nestjs/jwt';

export default class APIFeatures {
  static async assignJwtToken(
    userId: string,
    jwtService: JwtService,
  ){
    const payload = { id: userId };  
    const token = jwtService.sign(payload);
    return token;
  }
}
