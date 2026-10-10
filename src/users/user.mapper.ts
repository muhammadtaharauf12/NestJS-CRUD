import { User } from '../generated/prisma/client';
import { UserResponseDto } from './dto/user-response.dto.js';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      isActive: user.isActive,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  static toResponseList(users: User[]): UserResponseDto[] {
    return users.map(UserMapper.toResponse);
  }
}