import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MsgSchema } from 'src/schema/message.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MsgSchema.name) private messageModel: Model<MsgSchema>,
    @InjectModel(User.name) private UserSchema: Model<User>,
  ) {}
  //send message
  async sendmessage(senderId: string, recId: string, message: string) {
    if (!Types.ObjectId.isValid(recId) || !Types.ObjectId.isValid(senderId)) {
      throw new BadRequestException(
        'Invalid sender or receiver ID format. Must be a 24-character hex string.',
      );
    }
    //get the user first
    const finduser = await this.UserSchema.findById(recId);
    if (!finduser) {
      throw new Error(' user not found');
    }
    //create the message
    return this.messageModel.create({
      senderId: new Types.ObjectId(senderId),
      recId: finduser._id,
      message: message,
    });
  }
  //receive the message
  async receivemsg(recId: string, senderId: string) {
    //find the user first
    const finduser = await this.UserSchema.findById(senderId);
    if (!finduser) {
      throw new Error('sender not found ');
    }
    return await this.messageModel
      .find({
        recId: recId,
      })
      //.populate('User')
      .select('message')
      .sort({ createdAt: -1 });
  }
}
