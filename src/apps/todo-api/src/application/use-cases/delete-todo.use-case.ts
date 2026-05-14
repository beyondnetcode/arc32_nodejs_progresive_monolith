import { Inject, Injectable } from '@nestjs/common';
import { Result } from '../../core/common/result';
import { ITodoRepository } from '../../core/interfaces/todo-repository.interface';

@Injectable()
export class DeleteTodoUseCase {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

  public async execute(id: string): Promise<Result<void>> {
    const todo = await this.todoRepository.findById(id);
    if (!todo) {
      return Result.fail(`Todo with id "${id}" not found.`);
    }

    await this.todoRepository.delete(id);
    return Result.ok();
  }
}
