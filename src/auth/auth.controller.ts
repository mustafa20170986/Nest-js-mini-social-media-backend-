import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body('email') email: string) {
    return this.authService.login(email);
  }
}
