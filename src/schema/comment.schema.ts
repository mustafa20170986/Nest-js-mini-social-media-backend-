import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';
@Schema({ timestamps: true })
export class commentSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId!: Types.ObjectId | Post | string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId | User | string;
  @Prop({ required: true })
  body!: string;
}
export const commentModel = SchemaFactory.createForClass(commentSchema);
