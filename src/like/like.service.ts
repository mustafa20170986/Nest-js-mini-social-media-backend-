import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { likeSchema } from 'src/schema/like.schema';
import { Model } from 'mongoose';
@Injectable()
export class LikeService {
  constructor(
    @InjectModel(likeSchema.name) private likeModel: Model<likeSchema>,
  ) {}
  async likepost(postId: string, userId: string) {
    const likexist = await this.likeModel.findOne({
      userId: userId,
      postId: postId,
    });
    if (!likexist) {
      const newlike = await this.likeModel.create({
        userId: userId,
        postId: postId,
      });

      return newlike;
    }
    if (likexist) {
      const delike = await this.likeModel.deleteOne({ _id: likexist._id });
      return delike;
    }
  }
}
