export class UserResponseDto {
  id: number;
  email: string;
  name: string;
  age: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}