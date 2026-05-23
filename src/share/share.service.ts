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
  //share count
  async countshare(postId: string) {
    const getshares = await this.shareModel.countDocuments({
      ogpostId: postId,
    });
    return {
      postId: postId,
      sharecount: getshares,
    };
  }
  //share count wiuth aggrigate
  async sharecountagg(postId: string) {
    //mongo db aggrigate are sensitive about 
    //incomig data . they dont perform type casting 
    //under the hood . so manually convert them in to object
    const conv = new Types.ObjectId(postId);
    const resut = await this.shareModel
      .aggregate([
        {
          //match the post id with original postid 
          // here the filter filters out un-necessary docs 
          $match: { ogpostId: conv },
        },
        {
          //groupby all matched postid in a single row 
          //it completly change the document
          $group: {
            _id: '$ogpostId',
            //count  the total shares
            totalshare: { $sum: 1 },
          },
        },
        {
          //select the fileds 
          $project: {
            _id: 0,
            postId: '$ogpostId',
            totalshare: 1,
          },
        },
      ])
      .exec();
      //fallbaacks 
    if (!resut || resut.length === 0) {
      return { messsage: ' no share count yet' };
    }
    //return the arr 
    return resut[0];
  }
}
