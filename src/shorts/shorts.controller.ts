import { Body, Controller, Param, Post } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { createsorts } from 'src/dto/crt.sorts';
//didnt updated this on github
@Controller('shorts')
export class ShortsController {
  constructor(private readonly sortsService: ShortsService) {}
  @Post('crtsorts/:userId')
  createsorts(@Body() dto: createsorts, @Param('userId') userId: string) {
    return this.sortsService.createsorts(dto, userId);
  }
}
