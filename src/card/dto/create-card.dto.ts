
import { IsString, IsBoolean, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  dueDate: Date;

  @IsOptional()
  reminderDate: Date;
}
