import React, { useState } from "react";
import "./Task.css";
import pencilIcon from "/public/icons/pencil.svg";
import trashIcon from "/public/icons/trash.svg";
import TaskModal from "./TaskModal";
import { iTask } from "../../CommonInterfaces/Task";
import {
  editExistingTask,
  getTaskChildern,
  isTaskWithChildren,
} from "../../API/handleData";

interface iTaskProps {
  currentTask: iTask;
  onRemoveTask: (task: iTask) => void;
  onEditCallback?: () => void;
}

const Task: React.FC<iTaskProps> = ({
  currentTask,
  onRemoveTask,
  onEditCallback,
}: iTaskProps) => {
  const [isExpended, setExpended] = useState<boolean>(false);
  const [isEditTask, setEditTask] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const editModalTitle = `עריכת ${currentTask.description}`;

  const hasChildren = isTaskWithChildren(currentTask);
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

  const handleSaveEditModal = (editedTask: iTask) => {
    try {
      editExistingTask(editedTask);
      closeEditTaskModal();
      onEditCallback?.();
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
          {hasChildren && (
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
        getTaskChildern(currentTask).map((currentTask: iTask) => (
          <div className="child-task" key={currentTask.id}>
            <Task
              currentTask={currentTask}
              onRemoveTask={onRemoveTask}
              onEditCallback={onEditCallback}
            />
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
