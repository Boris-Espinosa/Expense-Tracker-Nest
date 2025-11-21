import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);
    const payload = {
      sub: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '12Hrs',
    });
    return { message: 'Registered Succesfully', token };
  }

  async login(user: { email: string; password: string }) {
    const userFound = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: user.email })
      .getOne();
    if (!userFound)
      return new HttpException('User does not exists', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(user.password, userFound.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const payload = {
      sub: userFound.id,
      username: userFound.username,
      email: userFound.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return { message: 'User registered succesfully', user: userFound, token };
  }
}
