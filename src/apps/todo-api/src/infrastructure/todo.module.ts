import { Module } from '@nestjs/common';
import { CompleteTodoUseCase } from '../application/use-cases/complete-todo.use-case';
import { CreateTodoUseCase } from '../application/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '../application/use-cases/delete-todo.use-case';
import { ListTodosUseCase } from '../application/use-cases/list-todos.use-case';
import { InMemoryTodoRepository } from './database/repositories/in-memory-todo.repository';
import { TodoController } from './controllers/todo.controller';

/**
 * To switch to the TypeORM adapter:
 *   1. Import TypeOrmModule.forFeature([TodoOrmEntity])
 *   2. Replace useClass: InMemoryTodoRepository with useClass: TodoRepositoryImpl
 * The domain and application layers remain untouched — that's the Port/Adapter guarantee.
 */
@Module({
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    ListTodosUseCase,
    CompleteTodoUseCase,
    DeleteTodoUseCase,
    {
      provide: 'ITodoRepository',
      useClass: InMemoryTodoRepository,
    },
  ],
})
export class TodoModule {}
