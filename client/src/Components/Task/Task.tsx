import React, { useState } from "react";
import "./Task.css";
import pencilIcon from "./pencil.svg";
import trashIcon from "./trash.svg";
import TaskModal from "./TaskModal";
import { iTask } from "../../CommonInterfaces/Task";
import { editExistingTask } from "../../axios/handleData";
import { TaskWithTheSameDescriptionExists } from "../../axios/Errors";

interface iTaskProps extends iTask {
  onRemoveTask: (task: iTask) => void;
  onEditCallback?: () => void;
}

const Task: React.FC<iTaskProps> = ({
  id,
  description: discription,
  status,
  onRemoveTask,
  onEditCallback = () => {},
}: iTaskProps) => {
  const [isExpended, setExpended] = useState<boolean>(false);
  const [isEditTask, setEditTask] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  const editModalTitle = `עריכת ${discription}`;
  const currentTask: iTask = {
    id,
    description: discription,
    status,
  };

  const handleExpandClick = () => {
    setExpended((prevState: boolean) => !prevState);
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
      //TODO: change later when instanceof is fixed
      //   if (err instanceof TaskWithTheSameDescriptionExists) {
      //     alert(err.message);
      //   }

      alert((err as TaskWithTheSameDescriptionExists).message);
    }
  };

  return (
    <>
      <div
        className="task"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="task-start">
          <button className="expend-button" onClick={handleExpandClick}>
            <div className={isExpended ? "arrow-up-task" : "arrow-down-task"} />
          </button>
          <span>{discription}</span>
        </div>
        <div className="task-status">{status}</div>
        {isHover && (
          <div className="task-icons">
            <img src={pencilIcon} onClick={openEditTaskModal} />
            <img src={trashIcon} onClick={() => onRemoveTask(currentTask)} />
          </div>
        )}
      </div>
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
