import { eTaskStatus } from "../CommonInterfaces/TaskStatus";
import { iTask } from "../CommonInterfaces/Task";
const taskList: iTask[] = [
    {
        id: 1,
        description: "משימה 1",
        status: eTaskStatus.ACTIVE
    },
    {
        id: 2,
        description: "משימה 2",
        status: eTaskStatus.COMPLETED
    }
]

export const getAllTasks = (): iTask[] => {
    return taskList
}

export const findTaskWithId = (taskId: number | undefined): iTask | undefined => {
    return taskList.find((task: iTask) => task.id === taskId);
}

export const findTaskWithDescription = (description: string | undefined) => {
    return taskList.find((task: iTask) => task.description === description)
}
