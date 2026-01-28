import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability, AvailabilityStatus } from './availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async create(createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const availability = this.availabilityRepository.create({
      ...createAvailabilityDto,
    });
    return this.availabilityRepository.save(availability);
  }

  async findAll(): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { status: AvailabilityStatus.OPEN },
      relations: ['bookings'],
    });
  }

  async findOne(id: number): Promise<Availability> {
    return this.availabilityRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });
  }
}