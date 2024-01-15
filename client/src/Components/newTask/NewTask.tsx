import React, { useState } from "react";
import NewTaskButton from "./NewTaskButton";
import NewTaskModal from "../Modal/Modal";
import { 
    iModalGenericContentProps,
    eContentTypesInModal, 
    iModalInputProps 
} from "../Modal/ModalContentTypes";

import { eFilterState, iTask } from "../Task/Task";

const NewTask: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [task, setTask] = useState<iTask>({
        discription: "", 
        status: eFilterState.NOT_ACTIVE, 
        taskParant: null
    })
    
    const modalTitle = "יצירת משימה"
    
    // const handleSetTask = ({...value}) => {
    //     setTask({...value, ...task})
    // }

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const modalInputDiscription: iModalGenericContentProps = {
        contentType: eContentTypesInModal.INPUT,
        modalContent: {
            title: "שם:",
            value: "",
            setValue: (discription: string): void => {
                setTask({...task, discription})
            }, 
            placeholder: "שם"
        } as iModalInputProps
    }

    const modalInputLink: iModalGenericContentProps = {
        contentType: eContentTypesInModal.INPUT,
        modalContent: {
            title: "קישור למשימה: ",
            value: "",
            setValue: (taskParant: string): void => {
                setTask({...task, taskParant})
            }, 
            placeholder: "חיפוש..."
        } as iModalInputProps
    }

    const genericModalArray: iModalGenericContentProps[] = [
        modalInputDiscription, 
        modalInputLink,
    ]

    return (
        <>
            <NewTaskButton onClick={handleOpenModal} />
            <NewTaskModal 
            showModal={showModal} 
            onClose={handleCloseModal} 
            title={modalTitle} 
            contentTypesArray={genericModalArray} />
        </>
    )
}

export default NewTask