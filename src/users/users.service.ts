import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientUser } from './client-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (userFound) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: passwordHash,
    });
    return await this.userRepository.save(newUser);
  }

  async findOne(email: string) {
    const userFound = await this.userRepository.findOne({
      where: { email },
      relations: ['expenses'],
    });
    if (!userFound)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return userFound;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    clientUser: ClientUser,
  ) {
    if (clientUser.sub !== id) throw new UnauthorizedException();

    const hasValidFields = Object.values(updateUserDto).some(
      (value) => value !== undefined && value !== null && value !== '',
    );
    if (!hasValidFields)
      throw new HttpException(
        'There must be at leat 1 valid update value (email, password, username)',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);
    const updates = { ...updateUserDto };
    if (typeof updateUserDto.password !== 'undefined') {
      const passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      updates.password = passwordHash;
    }
    await this.userRepository.update({ id }, { ...updates });
    const userPatched = await this.userRepository.findOneBy({ id });
    return userPatched;
  }

  async remove(id: number, clientUser: ClientUser) {
    if (id !== clientUser.sub) throw new UnauthorizedException();
    const deleted = await this.userRepository.delete({ id });
    if (deleted.affected) {
      return { message: 'User deleted succesfully', status: HttpStatus.OK };
    }
  }
}
