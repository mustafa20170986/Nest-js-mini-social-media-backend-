import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true, collection: 'shareschemas' })
export class shareSchema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId | string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Post', required: true })
  ogpostId!: Types.ObjectId | string;
}
export const shareModel = SchemaFactory.createForClass(shareSchema);
