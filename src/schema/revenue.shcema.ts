import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class revenueSchema extends Document {
  @Prop({ required: true })
  totalrevenue!: number;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId | string;
  @Prop({ type: Number, default: 0 })
  totalsorts!: number;
}
export const revenueModel = SchemaFactory.createForClass(revenueSchema);
