import { eTaskStatus } from "./TaskStatus";

export interface iTask {
    id: number,
    description: string,
    status: eTaskStatus,
    parentId?: number,
}