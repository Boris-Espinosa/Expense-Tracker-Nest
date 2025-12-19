import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    
    if (!authorization) {
      throw new UnauthorizedException('No authorization header provided');
    }
    
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    
    try {
      const user = await this.jwtService.verifyAsync(token);
      request.headers.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
