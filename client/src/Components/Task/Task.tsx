import React, { useEffect, useState } from "react";
import "./Task.css";
import pencilIcon from "./pencil.svg";
import trashIcon from "./trash.svg";
import TaskModal from "./TaskModal";
import { iTask } from "../../CommonInterfaces/Task";
import {
  editExistingTask,
  getTaskChildern,
  isTaskWithChildren,
} from "../../axios/handleData";
import { TaskWithTheSameNameExists } from "../../axios/Errors";

interface iTaskProps extends iTask {
  onRemoveTask: (task: iTask) => void;
  onEditCallback?: () => void;
}

const Task: React.FC<iTaskProps> = ({
  id,
  description: discription,
  status,
  parentId = undefined,
  onRemoveTask,
  onEditCallback = () => {},
}: iTaskProps) => {
  const [isExpended, setExpended] = useState<boolean>(false);
  const [isEditTask, setEditTask] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hasChildren, setHasChildren] = useState<boolean>(false);

  const editModalTitle = `עריכת ${discription}`;
  const currentTask: iTask = {
    id,
    description: discription,
    status,
    parentId,
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

  const handleSaveEditModal = (editedTask: iTask) => {
    try {
      editExistingTask(editedTask);
      closeEditTaskModal();
      onEditCallback();
    } catch (err) {
      if (err instanceof TaskWithTheSameNameExists) {
        alert(err.message);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setHasChildren(isTaskWithChildren(currentTask));
  }, []);

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
                className={isExpended ? "arrow-up-task" : "arrow-down-task"}
              />
            </button>
          )}
          <span>{discription}</span>
        </div>
        <div className="task-status">{status}</div>
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
              {...currentTask}
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
