import { Inject, Injectable } from '@nestjs/common';
import { Result } from '../../core/common/result';
import { Todo } from '../../core/entities/todo.entity';
import { ITodoRepository } from '../../core/interfaces/todo-repository.interface';

@Injectable()
export class ListTodosUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

  public async execute(): Promise<Result<Todo[]>> {
    const todos = await this.todoRepository.findAll();
    return Result.ok(todos);
  }
}
