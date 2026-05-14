import { Module } from '@nestjs/common';
import { TodoModule } from './infrastructure/todo.module';

@Module({
  imports: [TodoModule],
})
export class AppModule {}
