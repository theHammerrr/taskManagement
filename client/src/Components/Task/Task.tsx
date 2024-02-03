import React, { useState } from "react";
import './Task.css'
import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'
import TaskModal from "./TaskModal";
import { iTask } from "../../CommonInterfaces/Task";


interface iTaskProps extends iTask {
    onRemoveTask: (task: iTask) => void
}

const Task: React.FC<iTaskProps> = ({
    id,
    description: discription,
    status,
    onRemoveTask
}: iTaskProps) => {
    const [isExpended, setExpended] = useState<boolean>(false)
    const [isEditTask, setEditTask] = useState<boolean>(false)
    const [isHover, setIsHover] = useState<boolean>(false)

    const editModalTitle = `עריכת ${discription}`
    const currentTask: iTask = {
        id,
        description: discription,
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

    const handleSaveEditModal = (task: iTask) => {

    }

    return (
        <>
            <div className="task"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}>
                <div className="task-start">
                    <button className="expend-button" onClick={handleExpandClick} >
                        <div className={isExpended ? "arrow-up-task" : "arrow-down-task"} />
                    </button>
                    <span>{discription}</span>
                </div>
                <div className="task-status">{status}</div>
                {isHover &&
                    <div className="task-icons">
                        <img src={pencilIcon} onClick={openEditTaskModal} />
                        <img src={trashIcon} onClick={() => onRemoveTask(currentTask)} />
                    </div>
                }
            </div>
            {
                isEditTask &&
                <TaskModal
                    onClose={closeEditTaskModal}
                    onSave={handleSaveEditModal}
                    showModal={isEditTask}
                    title={editModalTitle}
                    givenTask={currentTask} />
            }
        </>
    )
}

export default Task

