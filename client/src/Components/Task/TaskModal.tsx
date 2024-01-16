import React, { useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { eFilterState, iTask } from "./Task";
// import { eContentTypesInModal, iModalGenericContentProps } from "../Modal/ModalContentTypes";
// import { iModalInputProps } from "../Modal/ModalTypes/ModalInput/ModalInput";


export type tTaskModalProps = Omit<iModalProps, "contentTypesArray">

const TaskModal: React.FC<tTaskModalProps> = ({
    onClose, 
    showModal, 
    title
}) => {
    const [task, setTask] = useState<iTask>({
        discription: "",
        status: eFilterState.NOT_ACTIVE,
        taskParant: null
    })

    // const modalInputDiscription: iModalGenericContentProps = {
    //     contentType: eContentTypesInModal.INPUT,
    //     modalContent: {
    //         title: "שם:",
    //         value: "",
    //         setValue: (discription: string): void => {
    //             setTask({...task, discription})
    //         }, 
    //         placeholder: "שם"
    //     } as iModalInputProps
    // }

    // const modalInputLink: iModalGenericContentProps = {
    //     contentType: eContentTypesInModal.DROP_DOWN,
    //     modalContent: {
    //         title: "קישור למשימה: ",
    //         value: "",
    //         setValue: (taskParant: string): void => {
    //             setTask({...task, taskParant})
    //         }, 
    //         placeholder: "חיפוש..."
    //     } as iModalInputProps
    // }
    
    // const genericModalArray: iModalGenericContentProps[] = [
    //     modalInputDiscription, 
    //     modalInputLink,
    // ]

    return (
        <Modal
            showModal={showModal}
            onClose={onClose}
            title={title}
            // contentTypesArray={genericModalArray}
             >
                <input className="modal-input"></input>
             </Modal>
    )
}

export default TaskModal