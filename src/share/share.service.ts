import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from 'src/schema/post.schema';
import { shareSchema } from 'src/schema/share.schema';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(shareSchema.name) private shareModel: Model<shareSchema>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}
  //share post
  async sharepost(userId: string, postId: string) {
    //find the post first
    const findpost = await this.postModel.findById(postId);
    if (!findpost) {
      throw new Error('post not found ');
    }

    return await this.shareModel.create({
      userId: userId,
      ogpostId: postId,
    });
  }
  //getshare post
  async getshared(userId: string) {
    return await this.shareModel
      .find({
        userId: userId,
      })
      .populate({
        path: 'ogpostId',
        select: 'title content userId image',
        populate: {
          path: 'owner',
          select: 'name',
        },
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
