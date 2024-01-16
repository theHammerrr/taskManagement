import React, { useState } from "react";
import NewTaskButton from "./NewTaskButton";
import TaskModal from "../Task/TaskModal";

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
            <NewTaskButton onClick={handleOpenModal} />
            <TaskModal
                showModal={showModal}
                onClose={handleCloseModal}
                title={modalTitle} ><>asd</></TaskModal>
        </>
    )
}

export default NewTask