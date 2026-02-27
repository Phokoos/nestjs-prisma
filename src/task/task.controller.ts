import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
    },
  ];

  @Get()
  findAll(): any {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): any {
    return this.taskService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateTaskDto): any {
    return this.taskService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): any {
    return this.taskService.update(+id, dto);
  }

  @Patch(':id')
  patchTask(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>): any {
    return this.taskService.patchTask(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): any {
    return this.taskService.delete(+id);
  }
}
