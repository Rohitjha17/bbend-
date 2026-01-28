import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { GymsService } from './gyms.service';
import { CreateGymDto } from './dto/create-gym.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserRole } from '../users/user.entity';

@Controller('gyms')
@UseGuards(JwtAuthGuard)
export class GymsController {
  constructor(private readonly gymsService: GymsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.OWNER)
  create(@Body() createGymDto: CreateGymDto, @Request() req) {
    return this.gymsService.create(createGymDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.gymsService.findAll();
  }
}