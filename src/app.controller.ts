//import { Controller, Get, ParseIntPipe } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  //UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
//import { Rnservice } from './app.service';
import { createuser } from './dto/createuser.dto';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';
import { CacheInterceptor } from './interceptors/cache/cache.interceptor';
//import { NameValidationPipePipe } from './pipes/validation.pipe/namelen.pipe.pipe';
@Controller('/api')
export class AppController {
  // updte in the constructor
  constructor(
    private readonly appService: AppService,
    //private readonly rnservice: Rnservice,
  ) {}

  //here define the route
}
