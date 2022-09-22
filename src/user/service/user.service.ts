import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from '../model/user.entity';
import { userPost } from '../model/user.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}

  findAll(): any {
    return this.userRepository.find();
  }

  findOne(username): any {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async create(user: userPost): Promise<any> {
    const findUser = await this.userRepository.findOne({ where: { username: user.username } });
     if(findUser){
        throw new BadRequestException({message: 'this username exists'})
     }
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }
}
