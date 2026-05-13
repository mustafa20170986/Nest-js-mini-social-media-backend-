import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowersService } from './followers.service';
@Controller('followers')
export class FollowersController {
  constructor(private readonly followerService: FollowersService) {}
  @Post('follow/:followingId')
  dofollow(
    @Param('followingId') followingId: string,
    @Body('followerId') followerId: string,
  ) {
    return this.followerService.dofollow(followerId, followingId);
  }
  @Delete('unfollow/:followingId')
  unfollow(
    @Param('followingId') followingId: string,
    @Body('followerId') followerId: string,
  ) {
    return this.followerService.dounfollow(followingId, followerId);
  }
  @Get('followerlist/:followerId')
  findlist(@Param('followerId') followerId: string) {
    return this.followerService.getfollowerlist(followerId);
  }
}
