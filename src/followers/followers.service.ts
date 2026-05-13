import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { followerSchema } from 'src/schema/follower.schema';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
@Injectable()
export class FollowersService {
  constructor(
    @InjectModel(followerSchema.name)
    private followerModel: Model<followerSchema>,
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}
  async dofollow(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new BadRequestException(' you cannot follow yourself');
    }
    const exist = await this.followerModel.findOne({
      followerId: followerId,
      followingId: followingId,
    });
    if (exist) {
      throw new BadRequestException('already followed');
    }
    return this.followerModel.create({
      followerId: followerId as any,
      followingId: followingId as any,
    });
  }
  async dounfollow(followingId: string, followerId: string) {
    return await this.followerModel.findOneAndDelete({
      followingId: followingId,
      followerId: followerId,
    });
  }
  async getfollowerlist(followerId: string) {
    const findfollowerlist = await this.followerModel
      .find({ followerId })
      .populate('followingId')
      .exec();
    return findfollowerlist;
  }
}
