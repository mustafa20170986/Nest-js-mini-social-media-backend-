import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { commentSchema } from 'src/schema/comment.schema';
import { Model } from 'mongoose';
//import { commentdto } from 'src/dto/comment.dto';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel(commentSchema.name) private commentModel: Model<commentSchema>,
  ) {}
  //create comment
  async writecomment(userId: string, postId: string, body: string) {
    const docomment = await this.commentModel.create({
      body,
      userId,
      postId,
    });
    return docomment;
  }
  //edit commment
  async editcomment(commentid: string, body: string, userId: string) {
    const findandedit = await this.commentModel
      .findByIdAndUpdate(
        { _id: commentid, userId: userId },
        { $set: { body: body } },
        { new: true },
      )
      .exec();
    return findandedit;
  }
  async deletecomment(id: string) {
    const delcomment = await this.commentModel.findByIdAndDelete(id);
    return delcomment;
    return { message: ' comment deleted' };
  }
  //get comment of a post
  async getcomment(postId: string) {
    const findpost = await this.commentModel
      .find({ postId: postId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .exec();
    return findpost;
  }
}
