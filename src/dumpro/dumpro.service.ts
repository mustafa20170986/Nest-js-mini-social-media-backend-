import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DumproService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}
  async sendnotification(userId: string) {
    const payload = {
      id: userId,
      message: ' hellow welcome to our mini social media app backend',
      timestamp: new Date().toISOString(),
    };
    console.log(' notiifcation send ');
    this.client.emit('send_welcome', payload);
    return { message: 'event dispatched' };
  }
}
