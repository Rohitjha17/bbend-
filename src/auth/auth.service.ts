import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { idToken, email, name } = loginDto;

    let userEmail: string;
    let userName: string;

    // If Firebase is initialized and idToken is provided, use Firebase
    if (this.firebaseService.isFirebaseInitialized() && idToken) {
      try {
        const decodedToken = await this.firebaseService.verifyIdToken(idToken);
        userEmail = decodedToken.email || email;
        userName = decodedToken.name || name || userEmail?.split('@')[0] || 'User';
        
        if (!userEmail) {
          throw new UnauthorizedException('Email not found in Firebase token');
        }
      } catch (error) {
        throw new UnauthorizedException(`Invalid Firebase ID token: ${error.message}`);
      }
    } else {
      // Fallback to simple email/name authentication (original behavior)
      if (!email) {
        throw new UnauthorizedException('Email is required when Firebase is not configured or idToken is not provided');
      }
      userEmail = email;
      userName = name || email.split('@')[0] || 'User';
    }

    // Check if user exists
    let user = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    // Create user if doesn't exist
    if (!user) {
      user = this.usersRepository.create({
        email: userEmail,
        name: userName,
        role: UserRole.USER,
      });
      await this.usersRepository.save(user);
    } else {
      // Update user name if it changed
      if (user.name !== userName) {
        user.name = userName;
        await this.usersRepository.save(user);
      }
    }

    // Generate JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(payload: any): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: payload.sub },
    });
  }
}