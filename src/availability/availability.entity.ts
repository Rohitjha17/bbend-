import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../bookings/booking.entity';

export enum AvailabilityStatus {
  OPEN = 'OPEN',
  BOOKED = 'BOOKED',
}

@Entity('availability')
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({
    type: 'enum',
    enum: AvailabilityStatus,
    default: AvailabilityStatus.OPEN,
  })
  status: AvailabilityStatus;

  @OneToMany(() => Booking, (booking) => booking.availability)
  bookings: Booking[];
}