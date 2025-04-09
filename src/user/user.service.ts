import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    
    // Se alguém tentar criar um usuário com o email admin
    if (createUserDto.email === adminEmail) {
      throw new ForbiddenException('Email reservado para administração');
    }
  
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      name: createUserDto.name,
      password: await bcrypt.hash(createUserDto.password, 10),
    }
  
    const createdUser = await this.prisma.user.create({
      data
    });
  
    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.prisma.user.findMany();
    
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async findOne(id: number): Promise<Omit<User, 'password'> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    // Preparar os dados para atualização
    const data: Prisma.UserUpdateInput = { ...updateUserDto };
    
    // Se houver uma senha a ser atualizada, aplicar hash
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
      
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data
    });
    
    // Remover a senha do resultado
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: number): Promise<Omit<User, 'password'>> {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    
    // Remover a senha do resultado
    const { password, ...userWithoutPassword } = deletedUser;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });

  }
}