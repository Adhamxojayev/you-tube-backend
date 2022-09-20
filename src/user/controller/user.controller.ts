import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
