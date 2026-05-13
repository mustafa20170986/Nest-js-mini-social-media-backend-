import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
@Schema({ timestamps: true })
//@index({ followerId: 1, followingId: 1 }, { unique: true })
export class followerSchema extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  followerId!: Types.ObjectId | User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  followingId!: Types.ObjectId | User;
}

export const followerModel = SchemaFactory.createForClass(followerSchema);
