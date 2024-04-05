import React, { useState } from "react";
import { iTask } from "../../CommonInterfaces/Task";
import { useTasksContext } from "../Contexts/TasksProvider";
import TaskModal from "../Task/TaskModal";
import "./NewTaskButton.css";
import newTaskIcon from "/public/icons/newTask.svg";

const modalTitle = "יצירת משימה";

const NewTaskButton: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { addNewTask } = useTasksContext();

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
