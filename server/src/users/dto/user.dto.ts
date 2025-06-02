/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsPhoneNumber(undefined, { message: 'Numéro de téléphone invalide' })
  phone?: string;

  @IsOptional()
  @IsString()
  profile?: string;

  @IsOptional()
  @IsEnum(['admin', 'doctor', 'nurse', 'receptionist', 'autre'])
  role?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  lastLogin?: Date;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
