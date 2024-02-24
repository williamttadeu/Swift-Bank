import { IsEnum } from "class-validator";
import { TaskStatus } from "../taskes.model";

export class UpdateTaskStatusDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}