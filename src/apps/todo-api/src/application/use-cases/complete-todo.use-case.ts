import { Inject, Injectable } from '@nestjs/common';
import { Result } from '../../core/common/result';
import { Todo } from '../../core/entities/todo.entity';
import { ITodoRepository } from '../../core/interfaces/todo-repository.interface';

@Injectable()
export class CompleteTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

  public async execute(id: string): Promise<Result<Todo>> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return Result.fail(`Todo with id "${id}" not found.`);
    }

    const completedResult = todo.complete();
    if (completedResult.isFailure) {
      return Result.fail(completedResult.errorValue);
    }

    const saved = await this.todoRepository.save(completedResult.getValue());
    return Result.ok(saved);
  }
}
