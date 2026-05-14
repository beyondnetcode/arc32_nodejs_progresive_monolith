import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateTodoDto } from '../../application/dtos/create-todo.dto';
import { CompleteTodoUseCase } from '../../application/use-cases/complete-todo.use-case';
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '../../application/use-cases/delete-todo.use-case';
import { ListTodosUseCase } from '../../application/use-cases/list-todos.use-case';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodo: CreateTodoUseCase,
    private readonly listTodos: ListTodosUseCase,
    private readonly completeTodo: CompleteTodoUseCase,
    private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateTodoDto) {
    const result = await this.createTodo.execute(dto);
    if (result.isFailure) throw new UnprocessableEntityException(result.errorValue);
    return { data: result.getValue() };
  }

  @Get()
  public async list() {
    const result = await this.listTodos.execute();
    return { data: result.getValue() };
  }

  @Patch(':id/complete')
  public async complete(@Param('id') id: string) {
    const result = await this.completeTodo.execute(id);
    if (result.isFailure) {
      const msg = result.errorValue as string;
      if (msg.includes('not found')) throw new NotFoundException(msg);
      throw new UnprocessableEntityException(msg);
    }
    return { data: result.getValue() };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(@Param('id') id: string) {
    const result = await this.deleteTodo.execute(id);
    if (result.isFailure) throw new NotFoundException(result.errorValue);
  }
}
