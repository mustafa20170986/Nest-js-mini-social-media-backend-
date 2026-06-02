import { Module } from '@nestjs/common';
import { DumproService } from './dumpro.service';
import { DumproController } from './dumpro.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import these

@Module({
  imports: [
    //instead of using standerd register
    //we are using registerAsync so that
    //rabbit mq client do not connetc immediately
    //it waits untill other configuration established
    ClientsModule.registerAsync([
      {
        name: 'NOTIFICATION_SERVICE',
        //name creates a uniqe token injection
        //which will help to determine which instance to use
        imports: [ConfigModule], // Injects ConfigModule safely
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            // Safely extracts the URL from your environment variables asynchronously
            urls: [
              configService.get<string>('CLOUDAMQP_URL') ||
                'amqp://localhost:5672',
            ],
            queue: 'notification_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [DumproController],
  providers: [DumproService],
})
export class DumproModule {}
