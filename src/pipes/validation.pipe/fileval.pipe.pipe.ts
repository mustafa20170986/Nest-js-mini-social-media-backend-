import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidation implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(' file is required');
    }
    const Allowed = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!Allowed.includes(file.mimetype)) {
      throw new BadRequestException(' only jpeg ,jpg, png format is allowed ');
    }
    const maxsize = 1024 * 1024 * 10;
    if (file.size > maxsize) {
      throw new BadRequestException(' maximum 10 mb allowed');
    }
    return file;
  }
}
