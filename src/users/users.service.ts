//import { User } from '@clerk/express';
import { User } from 'src/schema/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createuser } from 'src/dto/createuser.dto';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  //reguser
  async reguser(crtdto: createuser) {
    const { name, email } = crtdto;
    const newuser = new this.userModel(crtdto);
    return await newuser.save();
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
  //getuser
  async getuser(id: string) {
    const finduser = await this.userModel.findById(id).exec();
    if (!finduser) {
      throw new NotFoundException('user not found ');
    }
    return finduser;
  }
}
