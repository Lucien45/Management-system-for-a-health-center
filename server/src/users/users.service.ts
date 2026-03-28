/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly supabaseService: SupabaseService,
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

    let profilePath: string | null = null;
    if (file) {
      const fileName = `hms_profiles/${Date.now()}-${file.originalname}`;
      const { error } = await this.supabaseService.uploadFile(
        fileName,
        file.buffer,
      );

      if (error) throw new Error('Erreur upload profile ➜ ' + error.message);

      profilePath = fileName;
    }

    const user = new User();
    Object.assign(user, dto);
    user.password = hashedPassword;
    user.date_creation = new Date();
    user.lastLogin = null;
    user.profile = file ? profilePath : null;
    return this.userRepository.save(user);
  }

  async login(data: { identifier: string; password: string }) {
    const { identifier, password } = data;
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });

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

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
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

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User avec ID ${userId} est introuvable`);
    }
    return user;
  }

  async updateUser(
    userId: number,
    dto: UpdateUserDto,
    file?: Express.Multer.File,
  ): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    let profilePath = user?.profile;

    if (file) {
      // dto.profile = `media/profiles/${file.filename}`;
      const fileName = `hms_profiles/${Date.now()}-${file.originalname}`;
      const { error } = await this.supabaseService.uploadFile(
        fileName,
        file.buffer,
      );
      if (error) throw new Error('Erreur upload profile ➜ ' + error.message);

      profilePath = fileName;
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

    dto.profile = profilePath;

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.getUserById(userId);
    if (!user)
      throw new NotFoundException(`User avec ID ${userId} est introuvable`);
    await this.userRepository.remove(user);
  }
}
