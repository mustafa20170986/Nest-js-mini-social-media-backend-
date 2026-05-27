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
}
