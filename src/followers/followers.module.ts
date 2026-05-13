import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { followerModel, followerSchema } from 'src/schema/follower.schema';
import { UserSchema, User } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: followerSchema.name, schema: followerModel },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [FollowersService],
  controllers: [FollowersController],
  exports: [FollowersService],
})
export class FollowersModule {}
