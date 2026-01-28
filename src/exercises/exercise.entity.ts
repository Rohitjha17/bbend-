import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutPlan } from '../plans/workout-plan.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  planId: number;

  @Column()
  name: string;

  @Column()
  reps: number;

  @Column()
  sets: number;

  @ManyToOne(() => WorkoutPlan, (plan) => plan.exercises)
  @JoinColumn({ name: 'planId' })
  plan: WorkoutPlan;
}