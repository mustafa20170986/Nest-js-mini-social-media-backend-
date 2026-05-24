import { Body, Controller, Param, Post, Get } from '@nestjs/common';
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
  @Get('recmsg/:recId/:senderId')
  receivemsg(
    @Param('recId') recId: string,
    @Param('senderId') senderId: string,
  ) {
    return this.messageService.receivemsg(recId, senderId);
  }
  @Post('crtgrp/:creatorId')
  messangergroup(
    @Param('creatorId') creatorId: string,
    @Body('memberId') memberId: string[],
  ) {
    return this.messageService.messangergroup(creatorId, memberId);
  }
  @Post('sendmsgingrp/:senderId/:groupId')
  sendgrpmessage(
    @Param('senderId')
    senderId: string,
    @Param('groupId') groupId: string,
    @Body('msg') msg: string,
  ) {
    return this.messageService.sendgrpmessage(senderId, groupId, msg);
  }
}
