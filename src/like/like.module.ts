import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { MongooseModule } from '@nestjs/mongoose';
import { likeModel, likeSchema } from 'src/schema/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: likeSchema.name, schema: likeModel }]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
