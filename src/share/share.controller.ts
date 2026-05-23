import { Controller, Get, Param, Post } from '@nestjs/common';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}
  @Post('share/:userId/:postId')
  sharepost(@Param('userId') userId: string, @Param('postId') postId: string) {
    return this.shareService.sharepost(userId, postId);
  }
  @Get('shareof/:userId')
  getshared(@Param('userId') userId: string) {
    return this.shareService.getshared(userId);
  }
  @Get('sharecount/:postId')
  countshare(@Param('postId') postId: string) {
    return this.shareService.countshare(postId);
  }
  @Get('shareagg/:postId')
  sharecountagg(@Param('postId') postId: string) {
    return this.shareService.sharecountagg(postId);
  }
}
