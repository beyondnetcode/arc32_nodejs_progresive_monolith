import { Injectable } from '@nestjs/common';
import { Todo } from '../../../core/entities/todo.entity';
import { ITodoRepository } from '../../../core/interfaces/todo-repository.interface';

/**
 * In-memory adapter for ITodoRepository.
 * Enables running the demo without a database — swap for TypeORM adapter in production.
 * Activated when USE_IN_MEMORY=true (default for local demo).
 */
@Injectable()
export class InMemoryTodoRepository implements ITodoRepository {
  private readonly store = new Map<string, Todo>();

  public async save(todo: Todo): Promise<Todo> {
    this.store.set(todo.id, todo);
    return todo;
  }

  public async findAll(): Promise<Todo[]> {
    return Array.from(this.store.values());
  }

  public async findById(id: string): Promise<Todo | null> {
    return this.store.get(id) ?? null;
  }

  public async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
