import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schema/post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService, UploadService],
  controllers: [PostController],
})
export class PostModule {}
