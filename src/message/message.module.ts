import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { messageModel, MsgSchema } from 'src/schema/message.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MsgSchema.name, schema: messageModel },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
