import { Module } from '@nestjs/common';
import { SortsopsService } from './sortsops.service';
import { MongooseModule } from '@nestjs/mongoose';
import { sortopsModel, sortopsSchema } from 'src/schema/sortops.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { SortsopsController } from './sortsops.controller';
import { UservalidationGuard } from 'src/uservalidation/uservalidation.guard';
import { sortSchema, sortsModel } from 'src/schema/sorts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: sortopsSchema.name, schema: sortopsModel },
      { name: sortSchema.name, schema: sortsModel },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [SortsopsController],
  providers: [SortsopsService, UservalidationGuard],
  exports: [SortsopsService],
})
export class SortsopsModule {}
