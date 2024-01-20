import React, { useState } from "react";
import './Task.css'
import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'
import TaskModal from "./TaskModal";

export enum eFilterState {
    NOT_ACTIVE = 'לא פעיל',
    ACTIVE = 'פעיל'
}

export interface iTask {
    discription: string,
    status: eFilterState,
    taskParant?: iTask
}

const Task: React.FC<iTask> = ({
    discription,
    status
}: iTask) => {
    const [isExpended, setExpended] = useState<boolean>(false)
    const [isEditTask, setEditTask] = useState<boolean>(false)

    const editModalTitle = "עריכת משימה"
    const handleExpandClick = () => {
        setExpended((prevState: boolean) => !prevState)
    }

    const openEditTaskModal = () => {
        setEditTask(true)
    }

    const closeEditTaskModal = () => {
        setEditTask(false)
    }

    return (
        <>
            <div className="task">
                <div className="task-start">
                    <button className="expend-button" onClick={handleExpandClick} >
                        <div className={isExpended ? "arrow-up-task" : "arrow-down-task"} />
                    </button>
                    <span>{discription}</span>
                </div>
                <div className="task-status">{status}</div>
                <div className="task-icons">
                    <img src={pencilIcon} onClick={openEditTaskModal} />
                    <img src={trashIcon} />
                </div>
            </div>
            <TaskModal
                onClose={closeEditTaskModal}
                onSave={closeEditTaskModal}
                showModal={isEditTask}
                title={editModalTitle} 
                currentTask={{discription,status}} />
        </>
    )
}

export default Task

