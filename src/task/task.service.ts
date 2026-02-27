import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'Task 2',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Task 3',
      isCompleted: true,
    },
  ];

  public findAll(): Task[] {
    return this.tasks;
  }

  public findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id == id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  public create(dto: CreateTaskDto): Task {
    const { title, priority, tags } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      title: title,
      priority: priority ?? 0,
      tags: tags ?? [],
      isCompleted: true,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  public update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    const { title, isCompleted } = dto;
    task.title = title;
    task.isCompleted = isCompleted;
    return task;
  }

  public patchTask(id: number, dto: Partial<UpdateTaskDto>): Task {
    const task = this.findOne(id);
    const { title, isCompleted } = dto;

    if (title) {
      task.title = title;
    }
    if (isCompleted !== undefined) {
      task.isCompleted = isCompleted;
    }

    return task;
  }

  public delete(id: number): object {
    this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return {
      status: true,
    };
  }
}
