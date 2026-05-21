import { Controller, Get, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('dolike/:postId/:userId')
  likepost(@Param('postId') postId: string, @Param('userId') userId: string) {
    return this.likeService.likepost(postId, userId);
  }
  @Get('wholiked/:postId')
  findlikeduser(@Param('postId') postId: string) {
    return this.likeService.findlikeduser(postId);
  }
}
