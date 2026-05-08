import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string) {
    const finduser = await this.userService.findByEmail(email);
    if (!finduser) {
      throw new NotFoundException(' user not found ');
    }
    const payload = {
      email: finduser.email,
      sub: finduser._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name: finduser.name,
        email: finduser.email,
      },
    };
  }
}
