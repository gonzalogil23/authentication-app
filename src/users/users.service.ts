import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as fs from 'fs/promises';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}
  private readonly logger = new Logger(UsersService.name);

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (e) {
      this.logger.error(e.message);
      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (e) {
      this.logger.error(e.message);

      throw new NotFoundException(e);
    }
  }

  async create(
    createUserDto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    try {
      if (file) {
        const fileContent = await fs.readFile(file.path, 'base64');
        createUserDto.profilePicture = fileContent;
      }
      const newUser = await this.userModel.create(createUserDto);
      return newUser;
    } catch (e) {
      this.logger.error(e.message);
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
      this.logger.error(e.message);
      throw new BadRequestException(e);
    }
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async validateUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    console.log(user);

    if (user) {
      return user;
    } else {
      return null;
    }
  }
}
