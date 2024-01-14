import React, { useState } from "react";
import NewTaskButton from "./NewTaskButton";
import NewTaskModal from "../Modal/Modal";
import { iModalGenericContentProps, eContentTypesInModal } from "../Modal/ModalContentTypes";

const NewTask: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const modalTitle = "יצירת משימה"

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const modalInputProps: iModalGenericContentProps = {
        contentType: eContentTypesInModal.INPUT,
        modalContent: {
            title: "asd",
            value: "",
            setValue: function (value: string): void {
                throw new Error("Function not implemented.");
            }
        }
    }

    const tempArray: iModalGenericContentProps[] = []
    tempArray.push(modalInputProps)

    return (
        <>
            <NewTaskButton onClick={handleOpenModal} />
            <NewTaskModal 
            showModal={showModal} 
            onClose={handleCloseModal} 
            title={modalTitle} 
            contentTypesArray={tempArray} />
        </>
    )
}

export default NewTask