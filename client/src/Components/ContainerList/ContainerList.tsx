import React, { useEffect, useState } from "react";
import {
  eTaskStatusFilter,
  eTaskStatusFilterAll,
} from "../../CommonInterfaces/FilterTasks";
import { eTaskStatus, iTask } from "../../CommonInterfaces/Task";
import { useDebounce } from "../../helpers/debounce";
import { useTasksContext } from "../Contexts/TasksProvider";
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
  const { taskList, filterTasks } = useTasksContext();

  const [statusFilter, setStatusFilter] = useState<eTaskStatusFilter>(
    eTaskStatusFilterAll.ALL
  );

  const [textFilter, setTextFilter] = useState<string>("");
  const [displayTaskList, setDisplayTaskList] = useState<iTask[]>(
    taskList.filter((task) => task.parentId === undefined)
  );

  const handleFilterTasks = (): void => {
    const filteredTasks = filterTasks({
      textFilter,
      statusFilter,
    });

    setDisplayTaskList([
      ...filteredTasks.filter((task: iTask) => task.parentId === undefined),
    ]);
  };

  const searchTextDebounce = useDebounce(() => {
    handleFilterTasks();
  }, 300);

  useEffect(() => {
    searchTextDebounce();
  }, [textFilter]);

  const handleTextFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value);
  };

  useEffect(() => {
    handleFilterTasks();
  }, [statusFilter]);

  useEffect(() => {
    handleFilterTasks();
  }, [taskList]);

  const handleChangeFilter = (value: string) => {
    setStatusFilter(value as eTaskStatusFilter);
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
          <Task key={currentTask.id} currentTask={currentTask} />
        ))}
      </div>
      <div className="new-task-button">
        <NewTaskButton />
      </div>
    </div>
  );
};

export default ContainerList;
