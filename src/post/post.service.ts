import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createpost } from 'src/dto/post.dto';
import { Post } from 'src/schema/post.schema';
import { Model } from 'mongoose';
import { updtpost } from 'src/dto/updt.post.dto';
@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async createpost(psotdto: createpost) {
    const { title, content } = psotdto;

    const newpost = new this.postModel(psotdto);
    return await newpost.save();
  }
  async getsinglepost(id: string) {
    const getpost = await this.postModel
      .findById(id)
      .select('title content owner')
      .populate('owner', 'name email');
    if (!getpost) {
      throw new NotFoundException(' post doesnt found withb this id');
    }
    return getpost;
  }

  async getallpost(id: string) {
    const finduser = await this.postModel
      .findById(id)
      .select('title content -_id')
      .exec();
    //.populate('owner');
    if (!finduser) {
      throw new NotFoundException(' user not found');
    }
    return finduser;
  }

  async editpost(id: string, updtdto: updtpost) {
    const { title, content } = updtdto;
    const editedpost = await this.postModel
      .findByIdAndUpdate(id, updtdto, { new: true })
      .exec();
    return editedpost;
  }

  async delpost(id: string) {
    const findpost = await this.postModel.findByIdAndDelete(id);
    if (!findpost) {
      throw new NotFoundException('psot not found for delete');
    }
    return { message: ' post deleted ' };
  }
}
