import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userEntity } from '../model/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(userEntity)
    private readonly userRepository: Repository<userEntity>,
  ) {}

  findAll(): any {
    return this.userRepository.find();
  }
}
