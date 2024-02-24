import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './taskes.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';



@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto):Task[]{
    if(Object.keys(filterDto).length){
       return this.tasksService.getTasksWithFilters(filterDto)

    } else{
      return this.tasksService.getAllTasks();
    }
  }
  
  @Get('/:id')
  getTaskById(@Param('id') id:string): Task | { message: string } {
    const foundTask = this.tasksService.getTaskById(id);

    if (foundTask) {
      return foundTask;
    } else {
      throw new NotFoundException('Task did not find');
    }
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ):Task{
    return this.tasksService.createTask(createTaskDto)

  }

  @Delete('/:id')
  deleteTask(@Param('id')id:string):void{
    this.tasksService.deleteTask(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id')id:string,
   @Body() updateTaskStatusDto: UpdateTaskStatusDto):Task{
    const {status} = updateTaskStatusDto
    const updatedTask = this.tasksService.updateTaskStatus(id, status);

    if (updatedTask) {
      return updatedTask;
    } else {
      throw new NotFoundException('Task did not find');
    }
  }

}
