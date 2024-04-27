import { eTaskStatus } from "./Task"

export enum eTaskStatusFilterAll {
    ALL = "הכל"
}

export const ALL_STATUS = 'הכל' //change in filter to use ALL_STATUS

export type eTaskStatusFilter = eTaskStatus | typeof ALL_STATUS

export interface iFilterTasks {
    textFilter: string,
    statusFilter: eTaskStatusFilter
}