import { Module } from '@nestjs/common';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';
import { MongooseModule } from '@nestjs/mongoose';
import { shareSchema, shareModel } from 'src/schema/share.schema';
import { Post, PostSchema } from 'src/schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: shareSchema.name, schema: shareModel },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [ShareController],
  providers: [ShareService],
})
export class ShareModule {}
