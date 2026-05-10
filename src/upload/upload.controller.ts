import { Controller } from '@nestjs/common';
import { UploadService } from './upload.service';
import { PostService } from 'src/post/post.service';
import { createpost } from 'src/dto/post.dto';
import { FileValidation } from 'src/pipes/validation.pipe/fileval.pipe.pipe';
import { UploadedFile } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly postService: PostService,
  ) {}
  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadimage(
    @Body() postdto: createpost,
    @UploadedFile(new FileValidation()) file: Express.Multer.File,
  ) {
    const imageurl = await this.uploadService.upload(file);
    return this.postService.createpost({ ...postdto, image: imageurl });
  }
}
