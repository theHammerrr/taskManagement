import React, { useEffect, useState } from "react";
import "./ContainerList.css";
import Task from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import {
  getAllTasks,
  removeTask,
  filterTasks,
  getTasklistRootParents,
  getTaskDownHierarchy,
} from "../../axios/handleData";
import { useDebounce } from "../../helpers/debounce";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";
import { iTask } from "../../CommonInterfaces/Task";
import {
  eTaskStatusFilter,
  eTaskStatusFilterAll,
} from "../../CommonInterfaces/FilterTasks";
import NewTaskButton from "../newTask/NewTaskButton";

const ContainerList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<eTaskStatusFilter>(
    eTaskStatusFilterAll.ALL
  );

  const [textFilter, setTextFilter] = useState<string>("");
  const [displayTaskList, setDisplayTaskList] = useState<iTask[]>([]);

  const possibleStates = [
    eTaskStatusFilterAll.ALL,
    ...Object.values(eTaskStatus),
  ];

  const handleSetDisplayTaskList = (newList: iTask[]) => {
    setDisplayTaskList(getTasklistRootParents(newList));
  };

  const handleFilterTasks = (): iTask[] => {
    return filterTasks({ textFilter, statusFilter });
  };

  useEffect(() => {
    setDisplayTaskList(getTasklistRootParents());
  }, []);

  const searchTextDebounce = useDebounce(() => {
    handleSetDisplayTaskList(handleFilterTasks());
  }, 300);

  useEffect(() => {
    textFilter === ""
      ? setDisplayTaskList(getTasklistRootParents())
      : searchTextDebounce();
  }, [textFilter]);

  const handleTextFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value);
  };

  const handleChangeFilter = (value: string) => {
    if (value === statusFilter) return;

    setStatusFilter(value as eTaskStatusFilter);
    handleSetDisplayTaskList(
      filterTasks({ textFilter, statusFilter: value as eTaskStatusFilter })
    );
  };

  const handleRemoveTask = (task: iTask) => {
    const taskGenerationDown = getTaskDownHierarchy(task);
    taskGenerationDown.forEach((task) => {
      removeTask(task);
    });

    handleSetDisplayTaskList([...getAllTasks()]);
  };

  const changeTaskListCallback = () => {
    handleSetDisplayTaskList(handleFilterTasks());
  };

  return (
    <div className="ContainerList">
      <input
        type="text"
        className="SearchList"
        onChange={handleTextFilterChange}
      />
      <div className="filter-container">
        <span>סינון לפי:</span>
        <DropdownFilter
          currentFilter={statusFilter}
          handleClickItem={handleChangeFilter}
          possibleStates={possibleStates}
        />
      </div>
      <div className="tasks-container">
        {displayTaskList.map((currentTask: iTask) => (
          <Task
            key={currentTask.id}
            {...currentTask}
            onRemoveTask={handleRemoveTask}
            onEditCallback={changeTaskListCallback}
          />
        ))}
      </div>
      <div className="new-task-button">
        <NewTaskButton onSaveCallback={changeTaskListCallback} />
      </div>
    </div>
  );
};

export default ContainerList;
