import React, { useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { eFilterState, iTask } from "./Task";
import './TaskModal.css'

export type tTaskModalProps = Omit<iModalProps, "contentTypesArray">

const TaskModal: React.FC<tTaskModalProps> = ({
    onClose,
    showModal,
    title,
    onSave
}) => {
    const [task, setTask] = useState<iTask>({
        discription: "",
        status: eFilterState.NOT_ACTIVE,
        taskParant: null
    })

    type taskProperties = keyof iTask;
    const handleChangeTask = (
        event: React.FormEvent<HTMLInputElement>,
        property: taskProperties) => {
            setTask({
                ...task, 
                [property]: event.currentTarget.value
            })
    }

    
    return (
        <Modal
            showModal={showModal}
            onClose={onClose}
            title={title}
            onSave={onSave}
        >
            <div className="input-container">
                <span>שם:</span>
                <input 
                    className="input" 
                    placeholder="שם..." 
                    onChange={(event) => {
                        handleChangeTask(event, "discription")
                }} />
            </div>
        </Modal>
    )
}

export default TaskModal