import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutPlan } from './workout-plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(WorkoutPlan)
    private plansRepository: Repository<WorkoutPlan>,
  ) {}

  async create(createPlanDto: CreatePlanDto): Promise<WorkoutPlan> {
    const plan = this.plansRepository.create({
      ...createPlanDto,
    });
    return this.plansRepository.save(plan);
  }

  async findAll(): Promise<WorkoutPlan[]> {
    return this.plansRepository.find({
      relations: ['exercises'],
    });
  }

  async findOne(id: number): Promise<WorkoutPlan> {
    return this.plansRepository.findOne({
      where: { id },
      relations: ['exercises', 'gym'],
    });
  }
}