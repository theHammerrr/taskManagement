import { iTask } from "../CommonInterfaces/Task";
import taskListJson from "./tempData";
import { eTaskStatusFilterAll, iFilterTasks } from "../CommonInterfaces/FilterTasks";

const TASKS_LOCALSTORAGE_KEY = "tasks"

const getTasksFromLocalstorage = (): iTask[] => {
    const tasks = localStorage.getItem(TASKS_LOCALSTORAGE_KEY)
    if (tasks) return JSON.parse(tasks)
    else return taskListJson
}

const setTasksToLocalstorage = (tasks: iTask[]) => {
    localStorage.setItem(TASKS_LOCALSTORAGE_KEY, JSON.stringify(tasks))
}

const taskList = getTasksFromLocalstorage()

let counter = taskList.length // only goes up
const generateId = () => {
    counter++
    return counter
}



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

    setTasksToLocalstorage(taskList)

    return taskList
};


export const filterTasks = (filterData: iFilterTasks): iTask[] => {
    return taskList.filter((currentTask) =>
        currentTask.description.includes(filterData.textFilter) &&
        (filterData.statusFilter === eTaskStatusFilterAll.ALL || currentTask.status === filterData.statusFilter))
}

// returns all the parents and children of the given task. the given task is included.
export const getTaskAllHierarchy = (currentTask: iTask): iTask[] => {
    const allHierarchy: iTask[] = [
        ...getTaskDownHierarchy(currentTask),
        ...getTaskUpHierarchy(findTaskWithId(currentTask?.parentId))
    ]

    return allHierarchy
}

// return all the tasks down generations including the task itself
export const getTaskDownHierarchy = (currentTask: iTask): iTask[] => {
    const downHierarchy: iTask[] = []
    const taskChildren: iTask[] = getTaskChildern(currentTask)

    if (taskChildren.length) {
        taskChildren.forEach(task => downHierarchy.push(...getTaskDownHierarchy(task)))
    }

    downHierarchy.push(currentTask)

    return downHierarchy
}

// return all the task up generations including the task itself
const getTaskUpHierarchy = (currentTask: iTask | undefined): iTask[] => {
    if (currentTask === undefined) return []
    if (currentTask.parentId === undefined) return [currentTask]

    const upHierarchy = [currentTask, ...getTaskUpHierarchy(findTaskWithId(currentTask?.parentId))]
    return upHierarchy
}

export const findPossibleParents = (currentTask: iTask) => {
    const allHierarchy = getTaskDownHierarchy(currentTask).map(task => task.id);

    return taskList.filter((task: iTask) =>
        !allHierarchy.includes(task.id)
    );
}

export const addNewTask = (newTask: iTask) => {
    const isTaskDescriptionExists = findTaskWithDescription(newTask.description) ? true : false

    if (isTaskDescriptionExists) {
        throw new Error("there is another task with the same description")
    }

    const newId = generateId()
    taskList.push({
        ...newTask,
        id: newId
    })

    setTasksToLocalstorage(taskList)

    return taskList
}

export const editExistingTask = (editedTask: iTask) => {
    const isOtherTaskWithSameDescription =
        taskList.find(task =>
            task.description === editedTask.description &&
            task.id !== editedTask.id) ? true : false

    if (isOtherTaskWithSameDescription) {
        throw new Error("there is another task with the same description")
    }

    const taskIndex = taskList.findIndex(task => task.id === editedTask.id)

    if (taskIndex === -1) {
        throw new Error("task does not exists")
    }

    taskList[taskIndex] = {
        ...editedTask,
    }

    setTasksToLocalstorage(taskList)
}

export const getTaskChildern = (parentTask: iTask): iTask[] => {
    return taskList.filter(task => task.parentId === parentTask.id)
}

export const isTaskWithChildren = (parentTask: iTask): boolean => {
    return taskList.find(task => task.parentId === parentTask.id) ? true : false
}

export const initTaskListRootParents = () => {
    return taskList.filter(task => task.parentId === undefined)
}

export const getTaskListRootParents = (tasks: iTask[] = taskList) => {
    const tasksUpHierarchy: iTask[] = []
    tasks.map((currentTask: iTask) => tasksUpHierarchy.push(...getTaskUpHierarchy(currentTask)))

    const rootParents = tasksUpHierarchy.filter(task => task.parentId === undefined)
    return removeDuplicatesTasks(rootParents)
}

const removeDuplicatesTasks = (tasks: iTask[]): iTask[] => {
    const seen = new Set();

    return tasks.filter((task: iTask) => {
        const duplicate = seen.has(task.id);
        seen.add(task.id);
        return !duplicate;
    });
}