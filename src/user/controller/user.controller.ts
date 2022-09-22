import { BadRequestException, Body, Controller, Get, Param, Post, Res, UnauthorizedException } from '@nestjs/common';
import { userPost } from '../model/user.interface';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: number) {
    return this.userService.findOne(userId);
  }

  @Post('register')
  async create(@Body() userPost: userPost, @Res() response: Response): Promise<any> {
     const createdUser = await this.userService.create(userPost);

     return response.status(201).json({
          status:201, 
          message: 'success', 
          token: this.jwtService.sign({userId: createdUser.user_id})
     })
  }

  @Post('login')
  async login(@Body() userPost: userPost, @Res() response: Response): Promise<any> {
     const user = await this.userService.findOne(userPost.username);

     if(!user){
       throw new BadRequestException()
     }

     if(! await bcrypt.compare(userPost.password, user.password)){
       throw new UnauthorizedException()
     }
     
     return response.status(200).json({
          status:200, 
          message: 'sucess', 
          token: this.jwtService.sign({userId: user.user_id})
     });
  }
}
