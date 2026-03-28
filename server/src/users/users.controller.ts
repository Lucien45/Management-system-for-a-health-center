/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { JwtAuthGuard } from './middleware/auth.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(
    FileInterceptor('hms_profile', {
      storage: multer.memoryStorage(),
    }),
  )
  async create(
    @Body() dto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Profile recu: ', file);
    return this.usersService.createUser(dto, file);
  }

  @Post('login')
  async login(@Body() body: any) {
    const { identification, password } = body;

    if (!identification || typeof identification !== 'string') {
      throw new BadRequestException(
        'Le champ "identification" est requis et doit être une chaîne.',
      );
    }
    if (!password || typeof password !== 'string') {
      throw new BadRequestException(
        'Le champ "password" est requis et doit être une chaîne.',
      );
    }

    return this.usersService.login({ identifier: identification, password });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('hms_profile', {
      storage: multer.memoryStorage(),
    }),
  )
  async updateUser(
    @Param('id') id: number,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Photo recu:', file);
    console.log('mise a jour recu:', dto);
    return this.usersService.updateUser(id, dto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    const userId = Number(req.user?.sub);
    if (!userId) throw new UnauthorizedException('Utilisateur non authentifié');
    return this.usersService.getUserById(userId);
  }
}
