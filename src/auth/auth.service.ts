import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  async signIn(userSignInDto: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.userService.validateUser(userSignInDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      email: userSignInDto.email,
      password: userSignInDto.password,
      id: user.id,
    };

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
