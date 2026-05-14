import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { followerSchema } from 'src/schema/follower.schema';
import { Post } from 'src/schema/post.schema';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel(followerSchema.name)
    private followerModel: Model<followerSchema>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getfeed(id: string, page: number = 1, limit: number = 2) {
    //first find the followingids
    const findfollowingid = await this.followerModel
      .find({ followerId: id })
      .select('followingId');

    if (!findfollowingid) {
      throw new NotFoundException(' you are all catched up no  post ');
    }
    const idmap = findfollowingid.map((rel) => rel.followingId);
    console.log(idmap);
    const skip = (page - 1) * limit;
    const totalpost = await this.postModel
      .countDocuments({ owner: { $in: idmap } })
      .exec();
    const feedpost = await this.postModel
      .find({ owner: { $in: idmap } })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'owner',
        model: 'User',
        select: 'name email',
      })

      .exec();

    return {
      posts: feedpost,
      totalpages: Math.ceil(totalpost / limit),
      currentpage: page,
    };
  }
}
