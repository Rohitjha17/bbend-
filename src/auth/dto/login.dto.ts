import { IsOptional, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  // Firebase ID token (optional - use if Firebase is configured)
  @IsOptional()
  @IsString()
  idToken?: string;

  // Email and name for fallback authentication (required if idToken not provided)
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;
}