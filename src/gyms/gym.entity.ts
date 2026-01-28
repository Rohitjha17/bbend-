import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gyms')
export class Gym {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  ownerId: string;

  // Relations to users, plans, and availability are intentionally
  // omitted for this evaluation task. Backend is simplified to act
  // as a single-trainer system with no gym or owner logic.
}