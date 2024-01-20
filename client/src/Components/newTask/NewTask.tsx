import React, { useState } from "react";
import newTaskIcon from './newTask.svg'
import TaskModal from "../Task/TaskModal";
import './NewTask.css'

const NewTask: React.FC = () => {
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
            <TaskModal
                showModal={showModal}
                onClose={handleCloseModal}
                title={modalTitle} 
                onSave={handleCloseModal} />
        </>
    )
}

export default NewTask