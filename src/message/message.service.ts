import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MsgSchema } from 'src/schema/message.schema';
import { groupmsgSchema } from 'src/schema/msggroup.schema';
import { User } from 'src/schema/user.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MsgSchema.name) private messageModel: Model<MsgSchema>,
    @InjectModel(User.name) private UserSchema: Model<User>,
    @InjectModel(groupmsgSchema.name)
    private groupmsgModel: Model<groupmsgSchema>,
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
  //create messanger group
  async messangergroup(creatorId: string, memberId: string[]) {
    //verify creatorid
    const getusers = [creatorId, ...memberId];
    const findusers = await this.UserSchema.find({
      _id: { $in: getusers },
    });
    if (getusers.length !== findusers.length) {
      throw new Error(' some users not found');
    }
    //if okay then create the group
    return this.groupmsgModel.create({
      creatorId: creatorId,
      memberId: memberId,
    });
  }
}
