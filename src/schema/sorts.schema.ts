import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Schema } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class sortSchema extends Document {
  @Prop({ required: true })
  title!: string;
  @Prop({ required: true })
  content!: string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId | string;
}
export const sortsModel = SchemaFactory.createForClass(sortSchema);
