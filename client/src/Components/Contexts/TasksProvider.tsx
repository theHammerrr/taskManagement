import React, { useContext, useEffect, useState } from "react";
import {
  eTaskStatusFilterAll,
  iFilterTasks,
} from "../../CommonInterfaces/FilterTasks";
import { iTask } from "../../CommonInterfaces/Task";
import taskListJson from "./tempData";

interface iTaskContext {
  taskList: iTask[];
  setTaskList: (taskList: iTask[]) => void;
  addNewTask: (newTask: iTask) => void;
  removeTask: (taskToRemove: iTask) => void;
  filterTasks: (filterData: iFilterTasks) => iTask[];
  getTaskChildren: (parentTask: iTask) => iTask[];
  editTask: (editedTask: iTask) => void;
  findTaskWithId: (taskId: number | undefined) => iTask | undefined;
  findPossibleParents: (task: iTask) => iTask[];
  findTaskWithDescription: (taskDescription: string) => iTask | undefined;
}

const TasksContext = React.createContext<iTaskContext>({
  taskList: [],
  setTaskList: function (taskList: iTask[]): void {
    throw new Error("Function not implemented.");
  },
  addNewTask: function (newTask: iTask): void {
    throw new Error("Function not implemented.");
  },
  removeTask: function (taskToRemove: iTask): void {
    throw new Error("Function not implemented.");
  },
  filterTasks: function (filterData: iFilterTasks): iTask[] {
    throw new Error("Function not implemented.");
  },
  getTaskChildren: function (task: iTask): iTask[] {
    throw new Error("Function not implemented.");
  },
  editTask: function (editedTask: iTask): void {
    throw new Error("Function not implemented.");
  },
  findTaskWithId: function (taskId: number | undefined): iTask | undefined {
    throw new Error("Function not implemented.");
  },
  findPossibleParents: function (task: iTask): iTask[] {
    throw new Error("Function not implemented.");
  },
  findTaskWithDescription: function (
    taskDescription: string
  ): iTask | undefined {
    throw new Error("Function not implemented.");
  },
});

const getTaskListRootParents = (allTasks: iTask[], tasks: iTask[]) => {
  const tasksUpHierarchy: iTask[] = [];
  tasks.map((currentTask: iTask) =>
    tasksUpHierarchy.push(...getTaskUpHierarchy(allTasks, currentTask))
  );

  return removeDuplicatesTasks(tasksUpHierarchy);
};

const getTaskChildern = (allTasks: iTask[], parentTask: iTask): iTask[] => {
  return allTasks.filter((task: iTask) => task.parentId === parentTask.id);
};

export const getTaskAllHierarchy = (
  allTasks: iTask[],
  currentTask: iTask
): iTask[] => {
  const allHierarchy: iTask[] = [
    ...getTaskDownHierarchy(allTasks, currentTask),
    ...getTaskUpHierarchy(
      allTasks,
      allTasks.find((task: iTask) => task.id === currentTask?.parentId)
    ),
  ];

  return allHierarchy;
};

// return all the tasks down generations including the task itself
export const getTaskDownHierarchy = (
  allTasks: iTask[],
  currentTask: iTask
): iTask[] => {
  const downHierarchy: iTask[] = [];
  const taskChildren: iTask[] = getTaskChildern(allTasks, currentTask);

  if (taskChildren.length) {
    taskChildren.forEach((task) =>
      downHierarchy.push(...getTaskDownHierarchy(allTasks, task))
    );
  }

  downHierarchy.push(currentTask);

  return downHierarchy;
};

// return all the task up generations including the task itself
const getTaskUpHierarchy = (
  allTasks: iTask[],
  currentTask: iTask | undefined
): iTask[] => {
  if (currentTask === undefined) return [];
  if (currentTask.parentId === undefined) return [currentTask];

  const upHierarchy = [
    currentTask,
    ...getTaskUpHierarchy(
      allTasks,
      allTasks.find((task: iTask) => task.id === currentTask?.parentId)
    ),
  ];
  return upHierarchy;
};

const removeDuplicatesTasks = (tasks: iTask[]): iTask[] => {
  const seen = new Set();

  return tasks.filter((task: iTask) => {
    const duplicate = seen.has(task.id);
    seen.add(task.id);
    return !duplicate;
  });
};

const isTaskExists = (taskList: iTask[], currentTask: iTask): boolean => {
  return taskList.find(
    (task: iTask) =>
      task.description === currentTask.description && task.id !== currentTask.id
  )
    ? true
    : false;
};

const getTasks = (): iTask[] => {
  const tasks = localStorage.getItem(TASKS_LOCALSTORAGE_KEY);
  if (tasks) return JSON.parse(tasks);
  else return taskListJson;
};

const findPossibleParents = (taskList: iTask[], currentTask: iTask) => {
  const allHierarchy = getTaskDownHierarchy(taskList, currentTask).map(
    (task) => task.id
  );

  return taskList.filter((task: iTask) => !allHierarchy.includes(task.id));
};

const useTasksContext = () => useContext(TasksContext);
const TASKS_LOCALSTORAGE_KEY = "tasks";

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [taskList, setTaskList] = useState<iTask[]>(getTasks);
  const [counter, setCounter] = useState<number>(taskList.length + 1);

  const addNewTask = (newTask: iTask) => {
    const doesDescriptionExists = isTaskExists(taskList, newTask);

    if (doesDescriptionExists) {
      throw new Error("there is another task with the same description");
    }

    setTaskList([...taskList, { ...newTask, id: counter }]);
    setCounter(counter + 1);
  };

  const removeTask = (taskToRemove: iTask) => {
    setTaskList(taskList.filter((task: iTask) => task.id !== taskToRemove.id));
  };

  const filterTasks = (filterData: iFilterTasks): iTask[] => {
    const filteredTasks = taskList.filter(
      (currentTask) =>
        currentTask.description.includes(filterData.textFilter) &&
        (filterData.statusFilter === eTaskStatusFilterAll.ALL ||
          currentTask.status === filterData.statusFilter)
    );

    return getTaskListRootParents(taskList, filteredTasks);
  };

  const getTaskChildren = (parentTask: iTask): iTask[] => {
    return taskList.filter((task: iTask) => task.parentId === parentTask.id);
  };

  const editTask = (editedTask: iTask) => {
    const doesDescriptionExists = isTaskExists(taskList, editedTask);

    if (doesDescriptionExists) {
      throw new Error("there is another task with the same description");
    }

    const newTaskList = taskList.map((task: iTask) =>
      task.id === editedTask.id ? editedTask : task
    );

    setTaskList(newTaskList);
  };

  const findTaskWithId = (taskId: number | undefined): iTask | undefined => {
    return taskList.find((currentTask: iTask) => currentTask.id == taskId);
  };

  const findPossibleParents = (currentTask: iTask) => {
    const allHierarchy = getTaskDownHierarchy(taskList, currentTask).map(
      (task) => task.id
    );

    return taskList.filter((task: iTask) => !allHierarchy.includes(task.id));
  };

  const findTaskWithDescription = (
    taskDescription: string
  ): iTask | undefined => {
    return taskList.find((task: iTask) => task.description === taskDescription);
  };

  useEffect(() => {
    localStorage.setItem(TASKS_LOCALSTORAGE_KEY, JSON.stringify(taskList));
  }, [taskList]);

  return (
    <TasksContext.Provider
      value={{
        taskList,
        setTaskList,
        addNewTask,
        removeTask,
        filterTasks,
        getTaskChildren,
        editTask,
        findTaskWithId,
        findPossibleParents,
        findTaskWithDescription,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
export { useTasksContext };
