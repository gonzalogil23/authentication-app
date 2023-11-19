import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userToUpdate = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        {
          new: true,
          runValidators: true,
        },
      );
      return userToUpdate;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
