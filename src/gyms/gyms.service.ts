import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from './gym.entity';
import { CreateGymDto } from './dto/create-gym.dto';

@Injectable()
export class GymsService {
  constructor(
    @InjectRepository(Gym)
    private gymsRepository: Repository<Gym>,
  ) {}

  async create(createGymDto: CreateGymDto, ownerId: string): Promise<Gym> {
    const gym = this.gymsRepository.create({
      ...createGymDto,
      ownerId,
    });
    return this.gymsRepository.save(gym);
  }

  async findAll(): Promise<Gym[]> {
    return this.gymsRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: number): Promise<Gym> {
    return this.gymsRepository.findOne({
      where: { id },
      relations: ['owner', 'workoutPlans', 'availabilities'],
    });
  }

  async findByOwner(ownerId: string): Promise<Gym[]> {
    return this.gymsRepository.find({
      where: { ownerId },
      relations: ['workoutPlans', 'availabilities'],
    });
  }
}