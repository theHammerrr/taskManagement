import React, { useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { eFilterState, iTask } from "./Task";
import './TaskModal.css'

interface TaskModalProps extends iModalProps {
    currentTask?: iTask
}

const TaskModal: React.FC<TaskModalProps> = ({
    onClose,
    showModal,
    title,
    onSave,
    currentTask
}) => {
    const [task, setTask] = useState<iTask>(currentTask ? currentTask : {
        id: -1,
        discription: "",
        status: eFilterState.ACTIVE
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
                    value={task.discription}
                    placeholder="שם..."
                    onChange={(event) => {
                        handleChangeTask(event, "discription")
                    }} />
            </div>
        </Modal>
    )
}

export default TaskModal