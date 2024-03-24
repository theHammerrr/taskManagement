import React, { useState } from "react";
import newTaskIcon from "./newTask.svg";
import TaskModal from "../Task/TaskModal";
import "./NewTaskButton.css";
import { iTask } from "../../CommonInterfaces/Task";
import { addNewTask } from "../../API/handleData";

interface iNewTaskButtonProps {
  onSaveCallback?: () => void;
}

const NewTaskButton: React.FC<iNewTaskButtonProps> = ({ onSaveCallback }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalTitle = "יצירת משימה";

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createNewTask = (newTask: iTask) => {
    try {
      addNewTask(newTask);
      handleCloseModal();
      onSaveCallback?.();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <>
      <button className="modal-button" onClick={handleOpenModal}>
        <img src={newTaskIcon} />
      </button>
      {showModal && (
        <TaskModal
          handleOnClose={handleCloseModal}
          title={modalTitle}
          onSaveTask={createNewTask}
        />
      )}
    </>
  );
};

export default NewTaskButton;
