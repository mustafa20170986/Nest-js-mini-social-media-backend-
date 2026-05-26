import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sortopsSchema } from 'src/schema/sortops.schema';

@Injectable()
export class SortsopsService {
  constructor(
    @InjectModel(sortopsSchema.name) private sortopsModel: Model<sortopsSchema>,
  ) {}
  //view the sort
  async viewsort(userId: string, sortId: string) {
    return this.sortopsModel.create({
      reactorId: userId,
      sortId,
    });
  }
}
