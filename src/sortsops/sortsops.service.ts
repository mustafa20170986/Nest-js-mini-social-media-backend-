import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { sortopsSchema } from 'src/schema/sortops.schema';
import { sortSchema } from 'src/schema/sorts.schema';

@Injectable()
export class SortsopsService {
  constructor(
    @InjectModel(sortopsSchema.name) private sortopsModel: Model<sortopsSchema>,
    @InjectModel(sortSchema.name) private sortsModel: Model<sortSchema>,
  ) {}
  //view the sort
  async viewsort(userId: string, sortId: string) {
    return this.sortopsModel.create({
      reactorId: userId,
      sortId: sortId,
    });
  }
  //get total views of the post
  async gettotview(sortId: string, creatorId: string) {
    //verify the post belong from th user
    const verifypost = await this.sortsModel.findById(sortId);

    if (!verifypost) {
      throw new Error(' post not found ');
    }
    if (verifypost.userId.toString() !== creatorId) {
      throw new Error('u cannot have acess');
    }

    const viewcount = await this.sortopsModel.aggregate([
      {
        $match: {
          sortId: new mongoose.Types.ObjectId(sortId),
        },
      },
      {
        $group: {
          _id: '$sortId',

          totalViews: { $sum: 1 },
        },
      },
    ]);
    if (!viewcount || viewcount.length === 0) {
      return { message: 'no vies yet' };
    }
    return { sortId: sortId, totalViewCount: viewcount[0].totalViews };
  }
  //give reatc (like)
  async react(
    reactorId: string,
    sortId: string,
    reactTyps: 'like' | 'love' | 'angry' | 'care' | 'cry',
  ) {
    //if already like now performing love swap the logic

    //find if the record exist
    const currentreact = await this.sortopsModel.findOne({
      reactorId: reactorId,
      sortId: sortId,
    });
    // change react
    if (currentreact?.reacttype !== reactTyps) {
      await this.sortopsModel.findByIdAndUpdate(
        currentreact?._id,
        {
          reacttype: reactTyps,
        },
        { new: true },
      );
    }
    //like delet on toggle
    if (currentreact?.reacttype === reactTyps) {
      await this.sortopsModel.findByIdAndDelete(currentreact._id);
    }
    //if react not exist create new one
    if (!currentreact) {
      await this.sortopsModel.create({
        reactorId: reactorId,
        sortId: sortId,
        reacttype: reactTyps,
      });
    }
  }
  //get top view sorts
  async topviewsorts() {
    return this.sortsModel
      .find()
      .sort({ createdAt: -1 })
      .select('title content')
      .exec();
  }
  //get top view with viewcount
  async totalviewcount() {
    return this.sortsModel.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: this.sortopsModel.collection.name,
          localField: '_id',
          foreignField: 'sortId',
          as: 'viewlog',
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          totalViews: { $size: '$viewlog' },
        },
      },
    ]);
  }
}
