import React, { useState } from "react";
import './Task.css'
import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'
import TaskModal from "./TaskModal";

export enum eFilterState {
    ACTIVE = 'פעיל',
    COMPLETED = 'הושלם'
}

export interface iTask {
    id: number,
    discription: string,
    status: eFilterState,
    taskParant?: iTask, 
}

interface iTaskProps extends iTask {
    onRemoveTask: (task: iTask) => void
}

const Task: React.FC<iTaskProps> = ({
    id,
    discription,
    status,
    onRemoveTask
}: iTaskProps) => {
    const [isExpended, setExpended] = useState<boolean>(false)
    const [isEditTask, setEditTask] = useState<boolean>(false)

    const editModalTitle = "עריכת משימה"
    const currentTask: iTask = {
        id,
        discription, 
        status
    }

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
                    <img src={trashIcon} onClick={() => onRemoveTask(currentTask)}/>
                </div>
            </div>
            <TaskModal
                onClose={closeEditTaskModal}
                onSave={closeEditTaskModal}
                showModal={isEditTask}
                title={editModalTitle} 
                currentTask={currentTask} />
        </>
    )
}

export default Task

