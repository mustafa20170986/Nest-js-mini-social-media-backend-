import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class groupsendmsgSchema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'groupSchema', required: true })
  groupId!: Types.ObjectId | string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  senderId!: Types.ObjectId | string;
  @Prop({ required: true })
  msg!: string;
}
export const groupsendmsgModel =
  SchemaFactory.createForClass(groupsendmsgSchema);
