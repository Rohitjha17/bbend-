import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Availability, AvailabilityStatus } from '../availability/availability.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { availabilityId } = createBookingDto;

    // Check if availability exists
    const availability = await this.availabilityRepository.findOne({
      where: { id: availabilityId },
    });

    if (!availability) {
      throw new BadRequestException('Availability slot not found');
    }

    if (availability.status === AvailabilityStatus.BOOKED) {
      throw new BadRequestException('This slot is already booked');
    }

    // Check if slot already booked by anyone
    const existingBooking = await this.bookingsRepository.findOne({
      where: { availabilityId },
    });

    if (existingBooking) {
      throw new BadRequestException('You have already booked this slot');
    }

    const booking = this.bookingsRepository.create({
      availabilityId,
    });

    const savedBooking = await this.bookingsRepository.save(booking);

    // Mark availability as booked
    availability.status = AvailabilityStatus.BOOKED;
    await this.availabilityRepository.save(availability);

    return savedBooking;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({
      relations: ['availability'],
    });
  }
}