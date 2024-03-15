import React, { useEffect, useState } from "react";
import "./ContainerList.css";
import Task from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { debounce } from "../../helpers/debounce";
import { getAllTasks, removeTask, filterTasks } from "../../axios/handleData";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";
import { iTask } from "../../CommonInterfaces/Task";
import {
  eTaskStatusFilter,
  eTaskStatusFilterAll,
} from "../../CommonInterfaces/FilterTasks";

const STATUS_FILTER_ALL = eTaskStatusFilterAll.ALL;

const ContainerList: React.FC = () => {
  const [statusFilter, setStatusFilter] =
    useState<eTaskStatusFilter>(STATUS_FILTER_ALL);

  const [textFilter, setTextFilter] = useState<string>("");
  const [displayTaskList, setDisplayTaskList] = useState<iTask[]>([]);

  const possibleStates = [STATUS_FILTER_ALL, ...Object.values(eTaskStatus)];

  useEffect(() => {
    setDisplayTaskList(getAllTasks());
  }, []);

  useEffect(() => {
    searchTextDebounce();
  }, [textFilter]);

  const handleTextFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value);
  };

  const searchTextDebounce = debounce(() => {
    setDisplayTaskList(filterTasks({ textFilter, statusFilter }));
  }, 300);

  const handleChangeFilter = (value: string) => {
    if (value === statusFilter) return;

    setStatusFilter(value as eTaskStatusFilter);
    setDisplayTaskList(
      filterTasks({ textFilter, statusFilter: value as eTaskStatusFilter })
    );
  };

  const handleRemoveTask = (task: iTask) => {
    setDisplayTaskList(removeTask(task));
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
      {displayTaskList.map((currentTask: iTask) => (
        <Task
          key={currentTask.id}
          {...currentTask}
          onRemoveTask={handleRemoveTask}
        />
      ))}
    </div>
  );
};

export default ContainerList;
