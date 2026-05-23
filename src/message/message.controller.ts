import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('sendmessage/:senderId/:recId')
  sendmessage(
    @Param('senderId') senderId: string,
    @Param('recId') recId: string,
    @Body('message') message: string,
  ) {
    return this.messageService.sendmessage(senderId, recId, message);
  }
}
