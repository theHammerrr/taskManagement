import React, { useState } from "react";
import "./Task.css";
import pencilIcon from "./pencil.svg";
import trashIcon from "./trash.svg";
import TaskModal from "./TaskModal";
import { iTask } from "../../CommonInterfaces/Task";

interface iTaskProps extends iTask {
  onRemoveTask: (task: iTask) => void;
}

const Task: React.FC<iTaskProps> = ({
  id,
  description,
  status,
  onRemoveTask,
}: iTaskProps) => {
  const [isExpended, setExpended] = useState<boolean>(false);
  const [isEditTask, setEditTask] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const editModalTitle = `עריכת ${description}`;
  const currentTask: iTask = {
    id,
    description,
    status,
  };

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
    onRemoveTask(currentTask);
  };

  const openEditTaskModal = () => {
    setEditTask(true);
  };

  const closeEditTaskModal = () => {
    setEditTask(false);
  };

  const handleSaveEditModal = (task: iTask) => {};

  return (
    <>
      <div
        className="task"
        onMouseEnter={handleMouseOnEnter}
        onMouseLeave={handleMouseOnLeave}
      >
        <div className="task-start">
          <button className="expend-button" onClick={handleExpandClick}>
            <div className={isExpended ? "arrow-up-task" : "arrow-down-task"} />
          </button>
          <span>{description}</span>
        </div>
        <div className="task-status">{status}</div>
        {isHover && (
          <div className="task-icons">
            <img src={pencilIcon} onClick={openEditTaskModal} />
            <img src={trashIcon} onClick={handleRemoveTask} />
          </div>
        )}
      </div>
      {isEditTask && (
        <TaskModal
          onClose={closeEditTaskModal}
          onSave={handleSaveEditModal}
          showModal={isEditTask}
          title={editModalTitle}
          givenTask={currentTask}
        />
      )}
    </>
  );
};

export default Task;
