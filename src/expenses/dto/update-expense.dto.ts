import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @IsString()
  title?: string | undefined;

  @IsNumber()
  amount?: number | undefined;

  @IsString()
  category?: string | undefined;
}
