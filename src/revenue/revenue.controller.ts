import { Controller, Get, Param, Post } from '@nestjs/common';
import { RevenueService } from './revenue.service';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}
  @Get('get-rev/:userId')
  getuserrev(@Param('userId') userId: string) {
    return this.revenueService.getuserrevnue(userId);
  }
  @Post('gen-rev/:sortId')
  generaterevenue(@Param('sortId') sortId: string) {
    return this.revenueService.genratervenue(sortId);
  }
}
