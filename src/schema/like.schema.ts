import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema({ timestamps: true })
export class likeSchema extends Model {
  @Prop({ required: true })
  postId!: string;
  @Prop({ required: true })
  userId!: string;
}
export const likeModel = SchemaFactory.createForClass(likeSchema);
likeModel.index({ userId: 1, postId: 1 }, { unique: true });
