import { eTaskStatus } from "./TaskStatus"

export enum eTaskStatusFilterAll {
    ALL = "הכל"
}

export type eTaskStatusFilter = eTaskStatus | eTaskStatusFilterAll

export interface iFilterTasks {
    textFilter: string,
    statusFilter: eTaskStatusFilter
}