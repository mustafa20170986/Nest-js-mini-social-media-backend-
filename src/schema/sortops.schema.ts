import { Prop, SchemaFactory } from '@nestjs/mongoose';
// react, //reactiot id ,reatctype,sortid,viewcount
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';

export class sortopsSchema extends Document {
  @Prop({ required: true })
  view!: number;
  @Prop()
  reacttype!: string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  reactorId!: Types.ObjectId | string;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'sortSchema' })
  sortId!: Types.ObjectId | string;
}
export const sortopsModel = SchemaFactory.createForClass(sortopsSchema);
