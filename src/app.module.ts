import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller'; // Import this
//import { AppService } from './app.service'; // Import this
import { Redisservice } from './redis/redis.service';
import { PostModule } from './post/post.module';
//import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { FollowersModule } from './followers/followers.module';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    // 1. Load the .env file
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Setup Mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Removed UsersController from here (it's not a module)
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // 3. Import your feature modules
    UsersModule,

    PostModule,

    AuthModule,

    UploadModule,

    FollowersModule,

    FeedModule,
  ],
  // 4. Register the AppController so its routes (/user, /emu) work
  controllers: [AppController],

  // 5. Provide services needed by AppController
  providers: [Redisservice, AppService],
})
export class AppModule {}
