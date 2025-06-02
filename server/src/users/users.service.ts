import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.enity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    dto: CreateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const { email, password } = dto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) throw new BadRequestException('Email exist deja !');

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = new User();
    Object.assign(user, dto);
    user.password = hashedPassword;
    user.date_creation = new Date();
    user.lastLogin = null;
    user.profile = file ? `media/profiles/${file.filename}` : null;
    return this.userRepository.save(user);
  }

  async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;
    let user = await this.userRepository.findOne({
      where: { email: identifier },
    });
    if (!user) {
      user = await this.userRepository.findOne({
        where: { username: identifier },
      });
    }

    if (!user) {
      throw new UnauthorizedException(
        'Aucun utilisateur trouvé avec cet identifiant.',
      );
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect.');
    }

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user?.profile,
        role: user.role,
      },
    };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const objectId = new ObjectId(id);
    const user = await this.userRepository.findOne({
      where: { _id: objectId },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }

  async updateUser(
    userId: string,
    dto: UpdateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    if (file) {
      dto.profile = `media/profiles/${file.filename}`;
    }

    if (dto.password && dto.password.trim() !== '') {
      if (user.password !== dto.password) {
        dto.password = await bcrypt.hash(dto.password, 10);
      } else {
        dto.password = user.password;
      }
    } else {
      delete dto.password;
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user)
      throw new NotFoundException(`User avec ID ${userId} est introuvable`);
    await this.userRepository.remove(user);
  }
}
