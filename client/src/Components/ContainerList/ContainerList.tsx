import React, { useEffect, useState } from "react";
import {
  eTaskStatusFilter,
  eTaskStatusFilterAll,
} from "../../CommonInterfaces/FilterTasks";
import { iTask } from "../../CommonInterfaces/Task";
import { eTaskStatus } from "../../CommonInterfaces/Task";
import {
  filterTasks,
  getAllTasks,
  getTaskDownHierarchy,
  getTaskListRootParents,
  initTaskListRootParents,
  removeTask,
} from "../../API/handleData";
import { useDebounce } from "../../helpers/debounce";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import Task from "../Task/Task";
import NewTaskButton from "../newTask/NewTaskButton";
import "./ContainerList.css";

const possibleStates = [
  eTaskStatusFilterAll.ALL,
  ...Object.values(eTaskStatus),
];

const STATUS_FILTER_TEXT = "סינון לפי:";
const NAME_FILTER_TEXT = "חפש לפי שם";

const ContainerList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<eTaskStatusFilter>(
    eTaskStatusFilterAll.ALL
  );

  const [textFilter, setTextFilter] = useState<string>("");
  const [displayTaskList, setDisplayTaskList] = useState<iTask[]>(
    initTaskListRootParents()
  );

  const handleSetDisplayTaskList = (newList: iTask[]) => {
    setDisplayTaskList(getTaskListRootParents(newList));
  };

  const handleFilterTasks = (): iTask[] => {
    return filterTasks({ textFilter, statusFilter });
  };

  const searchTextDebounce = useDebounce(() => {
    handleSetDisplayTaskList(handleFilterTasks());
  }, 300);

  useEffect(() => {
    searchTextDebounce();
  }, [textFilter]);

  const handleTextFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value);
  };

  useEffect(() => {
    handleSetDisplayTaskList(handleFilterTasks());
  }, [statusFilter]);

  const handleChangeFilter = (value: string) => {
    setStatusFilter(value as eTaskStatusFilter);
  };

  const handleRemoveTask = (task: iTask) => {
    const taskGenerationDown = getTaskDownHierarchy(task);
    taskGenerationDown.forEach((task) => {
      removeTask(task);
    });

    handleSetDisplayTaskList(handleFilterTasks());
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
        placeholder={NAME_FILTER_TEXT}
      />
      <div className="filter-container">
        <span>{STATUS_FILTER_TEXT}</span>
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
            currentTask={currentTask}
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
