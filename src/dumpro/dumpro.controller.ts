import { Body, Controller, Post } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { DumproService } from './dumpro.service';

@Controller('dumpro')
export class DumproController {
  constructor(private readonly dumproService: DumproService) {}
  @Post('trigger')
  async triggerevent(@Body() body: { userId: string }) {
    return this.dumproService.sendnotification(body.userId);
  }
  @EventPattern('send_welcome')
  async handlenotify(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('event received');
    console.log('payload data', data);
  }
}
