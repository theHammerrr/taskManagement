import { iTask } from "../CommonInterfaces/Task";
import taskList from "./tempData";
import { eTaskStatusFilterAll, iFilterTasks } from "../CommonInterfaces/FilterTasks";
import { TaskDoesNotExists, TaskWithTheSameNameExists } from "./Errors";

const STATUS_FILTER_ALL = eTaskStatusFilterAll.ALL;
let counter = taskList.length // only goes up

const generateId = () => {
    counter++
    return counter
}


export const getAllTasks = (): iTask[] => {
    return taskList;
};

export const getAllParentsTasks = (): iTask[] => {
    return taskList.filter(task => task.parentId === undefined)
}

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

    console.log(taskList);

    // return taskList.length ? taskList : [];
    return taskList
};


export const filterTasks = (filterData: iFilterTasks): iTask[] => {
    const filteredTasks = taskList.filter((currentTask) =>
        currentTask.description.includes(filterData.textFilter) &&
        (filterData.statusFilter === STATUS_FILTER_ALL || currentTask.status === filterData.statusFilter))

    return filteredTasks
}

// returns all the parents and children of the given task. the given task is included.
export const getTaskAllHierarchy = (currentTask: iTask): iTask[] => {
    const allHierarchy: iTask[] = [
        ...getTaskDownHierarchy(currentTask),
        ...getTaskUpHierarchy(findTaskWithId(currentTask?.parentId))
    ]

    return allHierarchy
}

const getTaskDownHierarchy = (currentTask: iTask): iTask[] => {
    const downHierarchy: iTask[] = []
    const taskChildren: iTask[] = getTaskChildern(currentTask)

    if (taskChildren.length) {
        taskChildren.forEach(task => downHierarchy.push(...getTaskDownHierarchy(task)))
    }

    downHierarchy.push(currentTask)

    return downHierarchy
}

const getTaskUpHierarchy = (currentTask: iTask | undefined): iTask[] => {
    if (currentTask === undefined) return []
    if (currentTask.parentId === undefined) return [currentTask]

    // const parentTask = findTaskWithId(currentTask?.parentId)
    // console.log(parentTask);

    const upHierarchy = [currentTask, ...getTaskUpHierarchy(findTaskWithId(currentTask?.parentId))]
    // console.log("up");
    // console.log(upHierarchy);

    return upHierarchy
}

export const findPossibleParents = (currentTask: iTask) => {
    const allHierarchy = getTaskAllHierarchy(currentTask).map(task => task.id);

    return taskList.filter((task: iTask) =>
        // task.id !== currentTask.parentId
        !allHierarchy.includes(task.id)
    );
}

export const addNewTask = (newTask: iTask) => {
    const isTaskDescriptionExists = findTaskWithDescription(newTask.description) ? true : false

    if (isTaskDescriptionExists) {
        throw new TaskWithTheSameNameExists()
    }

    const newId = generateId()
    taskList.push({
        ...newTask,
        id: newId
    })

    return taskList
}

export const editExistingTask = (editedTask: iTask) => {
    const isOtherTaskWithSameDescription =
        taskList.find(task =>
            task.description === editedTask.description &&
            task.id !== editedTask.id) ? true : false

    if (isOtherTaskWithSameDescription) {
        throw new TaskWithTheSameNameExists()
    }

    const taskIndex = taskList.findIndex(task => task.id === editedTask.id)

    if (taskIndex === -1) {
        throw new TaskDoesNotExists()
    }

    taskList[taskIndex] = {
        ...editedTask,
    }
}

export const getTaskChildern = (parentTask: iTask): iTask[] => {
    return taskList.filter(task => task.parentId === parentTask.id)
}

export const isTaskWithChildren = (parentTask: iTask): boolean => {
    return taskList.find(task => task.parentId === parentTask.id) ? true : false
}