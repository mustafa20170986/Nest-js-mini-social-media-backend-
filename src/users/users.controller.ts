import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createuser } from 'src/dto/createuser.dto';
//import { Param } from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getuser(@Param('id') id: string) {
    return this.userService.getuser(id);
  }
  @Post('reguser')
  reguser(@Body() dto: createuser) {
    return this.userService.reguser(dto);
  }
}
