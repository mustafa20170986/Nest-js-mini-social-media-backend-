import { Module } from '@nestjs/common';
import { DumproService } from './dumpro.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    //register the module
    ClientsModule.register([
      {
        name: 'Notification-service',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
          queue: 'notification queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [DumproService],
})
export class DumproModule {}
