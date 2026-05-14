import { Result } from '../common/result';

export class Todo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly completed: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(id: string, title: string, description: string = ''): Todo {
    const now = new Date();
    return new Todo(id, title, description, false, now, now);
  }

  public complete(): Result<Todo> {
    if (this.completed) {
      return Result.fail('Todo is already completed.');
    }
    return Result.ok(new Todo(this.id, this.title, this.description, true, this.createdAt, new Date()));
  }
}
