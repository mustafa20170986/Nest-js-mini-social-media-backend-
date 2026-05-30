import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { revenueSchema } from 'src/schema/revenue.shcema';
import { sortopsSchema } from 'src/schema/sortops.schema';
import { sortSchema } from 'src/schema/sorts.schema';
import mongoose from 'mongoose';
@Injectable()
export class RevenueService {
  constructor(
    @InjectModel(revenueSchema.name) private revenueModel: Model<revenueSchema>,
    @InjectModel(sortopsSchema.name) private sortopsModel: Model<sortopsSchema>,
    @InjectModel(sortSchema.name) private sortModel: Model<sortSchema>,
  ) {}
  //generate revenue $0.50 on every 4 view
  async genratervenue(sortId: string) {
    //find the sort first
    //convert the incoming string to mongodb object
    const cleansortid = new mongoose.Types.ObjectId(sortId);
    //find the sort with sortid mongodb object
    const findsort = await this.sortModel.findOne({ _id: cleansortid });
    console.log(findsort);
    if (!findsort) {
      throw new Error(' sorts not found');
    }
    //aggregate total view of the sorts
    const totview = await this.sortModel
      .aggregate([
        {
          //match with mongodb object
          $match: {
            _id: cleansortid,
          },
        },
        {
          //perform left join with sortops collections
          $lookup: {
            from: this.sortopsModel.collection.name,
            localField: '_id',
            foreignField: 'sortId',
            as: 'viewcnt',
          },
        },
        {
          //shape the final pipeline
          $project: {
            totalviews: { $size: '$viewcnt' },
          },
        },
      ])
      .exec();
    //if no views
    if (!totview || totview.length === 0) {
      return { message: ' no views yet' };
    }
    const totalsorts = await this.sortModel.countDocuments();
    const totalview = totview[0].totalviews;
    const calrevenu = (totalview / 4) * 0.5;
    const makerevenue = await this.revenueModel.create({
      totalrevenue: calrevenu,
      userId: findsort.userId,
      totalsorts: totalsorts,
    });
    return makerevenue;
  }
  //get user revenue
  async getuserrevnue(userId: string) {
    const parsed = new mongoose.Types.ObjectId(userId);
    console.log(parsed);
    return this.revenueModel.findOne({ userId: parsed }).select('totalrevenue');
  }
  //top revenue generator
  async leaderbord() {
    return this.revenueModel.aggregate([
      {
        $sort: { totalrevenue: -1 },
      },

      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userlist',
        },
      },
      {
        $unwind: {
          path: '$userlist',
        },
      },
      {
        $project: {
          userName: '$userlist.name',

          totalrevenue: 1,
        },
      },
    ]);
  }
}
