import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { likeSchema } from 'src/schema/like.schema';
import { Model, Types } from 'mongoose';
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
  //get who liked
  //explicitly mention the colllectionname in the schema file
  async findlikeduser(postId: string) {
    // const findpost = new Types.ObjectId(postId);
    const result = await this.likeModel
      .aggregate([
        {
          $match: { postId: postId },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userdetails',
          },
        },
        {
          $unwind: '$userdetails',
        },
        {
          $group: {
            _id: '$postId',
            totalLikes: { $sum: 1 },
            likedBy: {
              $push: {
                userId: '$userId',
                name: '$userdetails.name',
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalLikes: 1,
            likedBy: 1,
          },
        },
      ])
      .exec();
    if (!result || result.length === 0) {
      return { message: 'no likes yet' };
    }
    return result[0];
  }
}
