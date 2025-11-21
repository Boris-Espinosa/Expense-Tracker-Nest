import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) user: { email: string; password: string },
  ) {
    return await this.authService.login(user);
  }
}
