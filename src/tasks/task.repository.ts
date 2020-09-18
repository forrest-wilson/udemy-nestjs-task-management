import { Task } from './task.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async deleteTask(id: number): Promise<DeleteResult> {
    return await Task.delete({ id });
  }

  async getAllTasks(): Promise<Task[]> {
    return await Task.find()
  }
}
