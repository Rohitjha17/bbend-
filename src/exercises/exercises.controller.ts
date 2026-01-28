import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserRole } from '../users/user.entity';

@Controller()
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post('plans/:planId/exercises')
  @UseGuards(RolesGuard)
  @Roles(UserRole.OWNER)
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Param('planId', ParseIntPipe) planId: number,
  ) {
    return this.exercisesService.create(createExerciseDto, planId);
  }

  @Get('plans/:planId/exercises')
  findByPlan(@Param('planId', ParseIntPipe) planId: number) {
    return this.exercisesService.findByPlan(planId);
  }
}