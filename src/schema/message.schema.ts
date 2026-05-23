import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class MsgSchema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  senderId!: Types.ObjectId | string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  recId!: Types.ObjectId | string;
  @Prop({ required: true })
  message!: string;
}
export const messageModel = SchemaFactory.createForClass(MsgSchema);
