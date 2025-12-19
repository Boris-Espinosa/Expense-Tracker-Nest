import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ClientUser } from 'src/users/client-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { VALID_CATEGORIES } from './categories';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private expensesRepository: Repository<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, clientUser: ClientUser) {
    const category = createExpenseDto.category.toLowerCase();
    if (VALID_CATEGORIES[category] === undefined)
      throw new HttpException(
        `The category should be a valid one of the following list:
      'Groceries',
      'Leisure',
      'Electronics',
      'Utilities',
      'Clothing',
      'Health',
      'Others',`,
        HttpStatus.BAD_REQUEST,
      );

    const newExpense = this.expensesRepository.create({
      ...createExpenseDto,
      user_id: clientUser.sub,
      category: VALID_CATEGORIES[category],
    });
    return await this.expensesRepository.save(newExpense);
  }

  async findAll(clientUser: ClientUser, filter: string) {
    if (filter === undefined)
      return await this.expensesRepository.findBy({ user_id: clientUser.sub });

    let dateNow = new Date();
    let custom = 0;
    switch (filter) {
      case 'week':
        dateNow.setDate(dateNow.getDate() - 7);
        break;

      case 'month':
        dateNow.setMonth(dateNow.getMonth() - 1);
        break;

      case 'three_months':
        dateNow.setMonth(dateNow.getMonth() - 3);
        break;

      default:
        custom = 1;
        break;
    }

    dateNow.setHours(0, 0, 0, 0);
    if (custom === 1) {
      const customDate = new Date(filter);
      if (customDate.toString() === 'Invalid Date')
        throw new HttpException('Invalid date', HttpStatus.BAD_REQUEST);
      dateNow = customDate;
    }

    return await this.expensesRepository.find({
      where: {
        user_id: clientUser.sub,
        created_at: MoreThanOrEqual(dateNow),
      },
    });
  }

  async findOne(id: number, clientUser: ClientUser) {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (expense?.user_id !== clientUser.sub) {
      throw new UnauthorizedException('You are not the owner of this task');
    }
    return expense;
  }

  async update(
    id: number,
    updateExpenseDto: UpdateExpenseDto,
    clientUser: ClientUser,
  ) {
    const hasValidFields = Object.values(updateExpenseDto).some(
      (value) => value !== undefined && value !== null && value !== '',
    );

    if (!hasValidFields)
      throw new HttpException(
        'There must be at least 1 valid field',
        HttpStatus.BAD_REQUEST,
      );

    const expense = await this.expensesRepository.findOneBy({ id });
    if (expense?.user_id !== clientUser.sub)
      throw new UnauthorizedException('You are not the owner of this task');
    const updates = { ...updateExpenseDto };

    await this.expensesRepository.update({ id }, { ...updates });
    return { message: 'Expense updated successfully' };
  }

  async remove(id: number, clientUser: ClientUser) {
    const expense = await this.expensesRepository.findOneBy({ id });
    if (expense?.user_id !== clientUser.sub)
      throw new UnauthorizedException('You are not the owner of this task');

    const result = await this.expensesRepository.delete({ id });
    if (!result.affected)
      throw new HttpException(
        'There was an error trying to delete the expense, please try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    return { message: 'Expense deleted successfully' };
  }
}
