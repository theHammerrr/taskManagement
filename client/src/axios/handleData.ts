import { iTask } from "../CommonInterfaces/Task";
import taskList from "./tempData";
import { eTaskStatusFilterAll, iFilterTasks } from "../CommonInterfaces/FilterTasks";

export const getAllTasks = (): iTask[] => {
    return taskList;
};

export const findTaskWithId = (
    taskId: number | undefined
): iTask | undefined => {
    return taskList.find((task: iTask) => task.id === taskId);
};

export const findTaskWithDescription = (description: string | undefined) => {
    return taskList.find((task: iTask) => task.description === description);
};

export const removeTask = (taskToDelete: iTask): iTask[] => {
    const taskIndex = taskList.findIndex(
        (task: iTask) => task.id === taskToDelete.id
    );

    if (taskIndex != -1) {
        taskList.splice(taskIndex, 1);
    }

    return taskList.length ? taskList : [];
};


export const filterTasks = (filterData: iFilterTasks) => {
    const filteredTasks = taskList.filter((currentTask) =>
        currentTask.description.includes(filterData.textFilter) &&
        (filterData.statusFilter === eTaskStatusFilterAll.ALL || currentTask.status === filterData.statusFilter))

    return filteredTasks
}