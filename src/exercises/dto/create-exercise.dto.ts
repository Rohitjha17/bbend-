import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(1)
  sets: number;
}