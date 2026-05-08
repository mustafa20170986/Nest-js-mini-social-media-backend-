import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { createpost } from 'src/dto/post.dto';
import { updtpost } from 'src/dto/updt.post.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('createpost')
  @UseGuards(AuthGuard('jwt'))
  Crtpost(@Body() postdto: createpost) {
    return this.postService.createpost(postdto);
  }
  @Get(':id')
  getsigle(@Param('id') id: string) {
    return this.postService.getsinglepost(id);
  }
  @Get('details/:id')
  getallpost(@Param('id') id: string) {
    return this.postService.getallpost(id);
  }
  @Put(':id')
  eidtpost(@Param('id') id: string, @Body() updto: updtpost) {
    return this.postService.editpost(id, updto);
  }
  @Delete(':id')
  delpsot(@Param('id') id: string) {
    return this.postService.delpost(id);
  }
}
