import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createsorts } from 'src/dto/crt.sorts';
import { sortSchema } from 'src/schema/sorts.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class ShortsService {
  constructor(
    @InjectModel(sortSchema.name) private shortsModel: Model<sortSchema>,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}
  // create sort
  async createsorts(dto: createsorts, userId) {
    const { title, content } = dto;
    //verify suer
    const finduser = await this.UserSchema.findById(userId);
    if (!finduser) {
      throw new Error('user not found');
    }
    //create sort
    return this.shortsModel.create({
      title: title,
      content: content,
      userId: finduser._id,
    });
  }
}
