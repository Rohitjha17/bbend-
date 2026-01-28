import { IsNumber, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @Min(1)
  availabilityId: number;
}