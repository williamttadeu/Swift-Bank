import { EntityRepository, Repository } from "typeorm";
import { Task } from "./dto/task.entity";


export class TasksRepository extends Repository<Task>{

}
EntityRepository(Task)(TasksRepository)