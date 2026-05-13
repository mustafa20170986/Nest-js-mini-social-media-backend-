import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  content!: string;
  @Prop()
  image?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner!: User;
}
export const PostSchema = SchemaFactory.createForClass(Post);
