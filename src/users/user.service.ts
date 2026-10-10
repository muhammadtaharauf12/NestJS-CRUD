import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { UserMapper } from './user.mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDb: UserDbService) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.userDb.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const user = await this.userDb.create(dto);
    return UserMapper.toResponse(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userDb.findAll();
    return UserMapper.toResponseList(users);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.userDb.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return UserMapper.toResponse(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userDb.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    if (dto.email && dto.email !== user.email) {
      const taken = await this.userDb.findByEmail(dto.email);
      if (taken) throw new ConflictException('Email already in use');
    }

    const updated = await this.userDb.update(id, dto);
    return UserMapper.toResponse(updated);
  }

  async remove(id: number): Promise<UserResponseDto> {
    const user = await this.userDb.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    const deleted = await this.userDb.delete(id);
    return UserMapper.toResponse(deleted);
  }
}