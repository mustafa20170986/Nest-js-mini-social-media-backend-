import { Injectable } from '@nestjs/common';
//import * as ImageKit  from 'imagekit';
const ImageKit = require('imagekit');
@Injectable()
export class UploadService {
  private imagekit: any;
  constructor() {
    this.imagekit = new ImageKit({
      publicKey: 'public_2IeVUftkbzKaxhdJyKPlsnKlZWc=',
      privateKey: 'private_7OF2HcxY8+sNHQdoTsGYmIgMKeg=',
      urlEndpoint: 'https://ik.imagekit.io/zuqazdd5w',
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const response = await this.imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });
    return response.url;
  }
}
