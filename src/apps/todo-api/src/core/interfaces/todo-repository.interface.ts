import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
  save(todo: Todo): Promise<Todo>;
  findAll(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  delete(id: string): Promise<void>;
}
