import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SortsopsService } from './sortsops.service';
import { UservalidationGuard } from 'src/uservalidation/uservalidation.guard';

@Controller('sortsops')
export class SortsopsController {
  constructor(private readonly sortopsService: SortsopsService) {}
  @Get('viewsort/:userId/:sortId')
  @UseGuards(UservalidationGuard)
  viewsort(@Param('userId') userId: string, @Param('sortId') sortId: string) {
    return this.sortopsService.viewsort(userId, sortId);
  }

  @Get('totview/:sortId/:creatorId')
  gettotview(
    @Param('sortId') sortId: string,
    @Param('creatorId') creatorId: string,
  ) {
    return this.sortopsService.gettotview(sortId, creatorId);
  }
  @Post('react/:reactorId/:sortid/:reacttype')
  react(
    @Param('reactorId') reatcorId: string,
    @Param('sortId') sortId: string,
    @Param('reacttype') reacttype: 'like' | 'love' | 'angry' | 'care' | 'cry',
  ) {
    return this.sortopsService.react(reatcorId, sortId, reacttype);
  }
}
