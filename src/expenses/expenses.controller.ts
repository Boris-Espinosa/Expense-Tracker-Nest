import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('expenses')
@UseGuards(AuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createExpenseDto: CreateExpenseDto,
    @Req() { headers },
  ) {
    return await this.expensesService.create(createExpenseDto, headers.user);
  }

  @Get()
  findAll(@Req() { headers }, @Query('filters') filter: string) {
    return this.expensesService.findAll(headers.user, filter);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { headers },
    @Query('filters') filters: string,
  ) {
    return this.expensesService.findOne(id, headers.user);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ValidationPipe({ skipNullProperties: true }))
    updateExpenseDto: UpdateExpenseDto,
    @Req() { headers },
  ) {
    return this.expensesService.update(id, updateExpenseDto, headers.user);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number, @Req() { headers }) {
    return this.expensesService.remove(id, headers.user);
  }
}
