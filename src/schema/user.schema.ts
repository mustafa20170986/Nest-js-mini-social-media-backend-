import { Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
//import { U } from 'node_modules/@upstash/redis/error-8y4qG0W2';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
