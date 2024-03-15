import React, { useEffect, useState } from "react";
import "./ContainerList.css";
import Task from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { debounce } from "../../helpers/debounce";
import { getAllTasks } from "../../axios/tempData";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";
import { iTask } from "../../CommonInterfaces/Task";

const STATUS_FILTER_ALL = "הכל";

const ContainerList: React.FC = () => {
  const taskList = getAllTasks();
  const [statusFilter, setStatusFilter] = useState<eTaskStatus | string>(
    STATUS_FILTER_ALL
  );
  const [textFilter, setTextFilter] = useState<string>("");
  const [displayTaskList, setDisplayTaskList] = useState<iTask[]>([]);

  const possibleStates = [STATUS_FILTER_ALL, ...Object.values(eTaskStatus)];

  useEffect(() => {
    setDisplayTaskList(getAllTasks());
  }, []);

  useEffect(() => {
    searchTextDebounce(textFilter);
  }, [textFilter]);

  const handleTextFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTextFilter(e.currentTarget.value);
  };

  const searchTasks = (text: string) => {
    setDisplayTaskList(() =>
      taskList.filter((currentTask) => currentTask.description.includes(text))
    );
  };

  const searchTextDebounce = debounce((text: string) => {
    searchTasks(text);
  }, 300);

  const handleChangeFilter = (value: string) => {
    if (value === statusFilter) return;

    setStatusFilter(value as eTaskStatus | string);

    if (value === STATUS_FILTER_ALL) {
      setDisplayTaskList(taskList);
    } else {
      setDisplayTaskList(() =>
        taskList.filter((task: iTask) => task.status === value)
      );
    }
  };

  const handleRemoveTask = (task: iTask) => {
    setDisplayTaskList(() =>
      displayTaskList.filter((currentTask) => task.id !== currentTask.id)
    );
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
