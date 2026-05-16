import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { commentModel, commentSchema } from 'src/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: commentSchema.name, schema: commentModel },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
