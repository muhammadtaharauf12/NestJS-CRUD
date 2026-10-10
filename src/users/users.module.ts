import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './user.service';
import { UserDbService } from './user-db.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserDbService],
})
export class UsersModule {}