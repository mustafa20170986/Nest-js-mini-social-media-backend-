import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post('comment/:postId/:userId')
  docommetn(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
    @Body('body') body: string,
  ) {
    return this.commentService.writecomment(postId, userId, body);
  }
  @Patch('editcomment/:commentid/:userId')
  editcommetn(
    @Param('commentid') commentid: string,
    @Param('userId') userId: string,
    @Body('body') body: string,
  ) {
    return this.commentService.editcomment(commentid, userId, body);
  }
  @Delete('deletecomment/:id')
  deletecomment(@Param('id') id: string) {
    return this.commentService.deletecomment(id);
  }
  @Get('getcmts/:postId')
  getcommnets(@Param('postId') postId: string) {
    return this.commentService.getcomment(postId);
  }
}
