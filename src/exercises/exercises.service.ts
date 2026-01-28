import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto, planId: number): Promise<Exercise> {
    const exercise = this.exercisesRepository.create({
      ...createExerciseDto,
      planId,
    });
    return this.exercisesRepository.save(exercise);
  }

  async findByPlan(planId: number): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      where: { planId },
      relations: ['plan'],
    });
  }
}