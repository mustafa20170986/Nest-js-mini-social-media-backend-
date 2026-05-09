import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { createpost } from 'src/dto/post.dto';
import { updtpost } from 'src/dto/updt.post.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly uploadService: UploadService,
  ) {}
  @Post('createpost')
  @UseInterceptors(FileInterceptor('image'))
  //@UseGuards(AuthGuard('jwt'))
  async Crtpost(
    @Body() postdto: createpost,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const imageurl = await this.uploadService.upload(file);
    return this.postService.createpost({ ...postdto, image: imageurl });
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
