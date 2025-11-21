import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ skipNullProperties: true }))
    updateUserDto: UpdateUserDto,
    @Req() { headers },
  ) {
    return this.usersService.update(id, updateUserDto, headers.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', new ParseIntPipe()) id: number, @Req() { headers }) {
    return this.usersService.remove(id, headers.user);
  }
}
