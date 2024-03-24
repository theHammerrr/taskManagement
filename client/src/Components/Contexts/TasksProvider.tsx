import React, { useContext, useState } from "react";
import { iTask } from "../../CommonInterfaces/Task";
import { getAllTasks } from "../../API/handleData";

interface iTaskContext {
  taskList: iTask[];
  setTaskList: (taskList: iTask[]) => any;
}

const TasksContext = React.createContext<iTaskContext>({
  taskList: [],
  setTaskList: () => {},
});
const useTasksContext = () => useContext(TasksContext);

const TasksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [taskList, setTaskList] = useState<iTask[]>(getAllTasks());

  return (
    <TasksContext.Provider value={{ taskList, setTaskList }}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
export { useTasksContext };
