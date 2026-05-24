import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class groupmsgSchema extends Document {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  creatorId!: Types.ObjectId | string;
  @Prop({
    type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    required: true,
  })
  memberId!: (Types.ObjectId | string)[];
  @Prop()
  groupname?: string;
  @Prop()
  grpmsg?: string;
}
export const groupmsgModel = SchemaFactory.createForClass(groupmsgSchema);
