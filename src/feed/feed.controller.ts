import { Controller, Get, Param, Query } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('get-feed/:id')
  getfeed(
    @Param('id') id: string,
    @Query('page')
    page?: string,
    @Query('limit') limit?: string,
  ) {
    const pagenum = page ? parseInt(page, 10) : 1;
    const limitnum = limit ? parseInt(limit, 10) : 2;
    return this.feedService.getfeed(id, pagenum, limitnum);
  }
}
