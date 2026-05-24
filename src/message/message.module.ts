import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { messageModel, MsgSchema } from 'src/schema/message.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { groupmsgModel, groupmsgSchema } from 'src/schema/msggroup.schema';
import {
  groupsendmsgModel,
  groupsendmsgSchema,
} from 'src/schema/grpmsgsend.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MsgSchema.name, schema: messageModel },
      { name: User.name, schema: UserSchema },
      { name: groupmsgSchema.name, schema: groupmsgModel },
      { name: groupsendmsgSchema.name, schema: groupsendmsgModel },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule {}
