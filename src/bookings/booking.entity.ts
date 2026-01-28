import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Availability } from '../availability/availability.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  availabilityId: number;

  @ManyToOne(() => Availability, (availability) => availability.bookings)
  @JoinColumn({ name: 'availabilityId' })
  availability: Availability;
}