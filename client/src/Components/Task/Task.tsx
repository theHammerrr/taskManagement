import React, { useEffect, useState } from "react";
import { iTask } from "../../CommonInterfaces/Task";
import { useTasksContext } from "../Contexts/TasksProvider";
import "./Task.css";
import TaskModal from "./TaskModal";
import pencilIcon from "/public/icons/pencil.svg";
import trashIcon from "/public/icons/trash.svg";

interface iTaskProps {
  currentTask: iTask;
}

const Task: React.FC<iTaskProps> = ({ currentTask }: iTaskProps) => {
  const [isExpended, setExpended] = useState<boolean>(false);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const editModalTitle = `עריכת ${currentTask.description}`;

  const { getTaskChildren, taskList, removeTask, editTask } = useTasksContext();
  const [taskChildren, setTaskChildren] = useState<iTask[]>(
    getTaskChildren(currentTask)
  );

  useEffect(() => {
    setTaskChildren(getTaskChildren(currentTask));
  }, [taskList]);

  const handleMouseOnLeave = () => {
    setIsHover(false);
  };

  const handleMouseOnEnter = () => {
    setIsHover(true);
  };
  const handleExpandClick = () => {
    setExpended((prevState: boolean) => !prevState);
  };

  const handleRemoveTask = () => {
    removeTask(currentTask);
  };
  const openEditTaskModal = () => {
    setIsEditTask(true);
  };

  const closeEditTaskModal = () => {
    setIsEditTask(false);
  };

  const handleSaveEditModal = (editedTask: iTask) => {
    try {
      editTask(editedTask);
      closeEditTaskModal();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <>
      <div
        className="task"
        onMouseEnter={handleMouseOnEnter}
        onMouseLeave={handleMouseOnLeave}
      >
        <div className="task-start">
          {!!taskChildren.length && (
            <button className="expend-button" onClick={handleExpandClick}>
              <div
                className={`arrow ${
                  isExpended ? "arrow-up-task" : "arrow-down-task"
                }`}
              />
            </button>
          )}
          <span>{currentTask.description}</span>
        </div>
        <div className="task-status">{currentTask.status}</div>
        {isHover && (
          <div className="task-icons">
            <img src={pencilIcon} onClick={openEditTaskModal} />
            <img src={trashIcon} onClick={handleRemoveTask} />
          </div>
        )}
      </div>
      {isExpended &&
        taskChildren.map((currentTask: iTask) => (
          <div className="child-task" key={currentTask.id}>
            <Task currentTask={currentTask} />
          </div>
        ))}
      {isEditTask && (
        <TaskModal
          handleOnClose={closeEditTaskModal}
          onSaveTask={handleSaveEditModal}
          title={editModalTitle}
          givenTask={currentTask}
        />
      )}
    </>
  );
};

export default Task;
