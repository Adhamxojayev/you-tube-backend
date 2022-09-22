import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './model/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forFeature([userEntity]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: {expiresIn: '1d'}
      })
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
