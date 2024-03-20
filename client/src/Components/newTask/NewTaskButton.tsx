import React, { useState } from "react";
import newTaskIcon from './newTask.svg'
import TaskModal from "../Task/TaskModal";
import './NewTaskButton.css'

const NewTaskButton: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const modalTitle = "יצירת משימה"

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className="modal-button" onClick={handleOpenModal}>
                <img src={newTaskIcon} />
            </button>
            {
                showModal &&
                <TaskModal
                    showModal={showModal}
                    onClose={handleCloseModal}
                    title={modalTitle}
                    onSave={handleCloseModal} />
            }
        </>
    )
}

export default NewTaskButton