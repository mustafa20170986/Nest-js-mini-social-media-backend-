import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { revenueModel, revenueSchema } from 'src/schema/revenue.shcema';
import { sortopsModel, sortopsSchema } from 'src/schema/sortops.schema';
import { sortSchema, sortsModel } from 'src/schema/sorts.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: revenueSchema.name, schema: revenueModel },
      { name: sortopsSchema.name, schema: sortopsModel },
      { name: sortSchema.name, schema: sortsModel },
    ]),
  ],
  providers: [RevenueService],
  exports: [RevenueService],
})
export class RevenueModule {}
