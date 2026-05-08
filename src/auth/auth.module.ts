import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtstr } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'i love you emu',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, jwtstr],
  exports: [AuthService],
})
export class AuthModule {}
