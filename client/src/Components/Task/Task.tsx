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
    // taskParant: iTask | null
    taskParant: string | null
}

const Task: React.FC<iTask> = ({
    discription, 
    status, 
    taskParant = null
}: iTask) => {
    const [isExpended, setExpended] = useState<boolean>(false)

    const handleExpandClick = () => {
        setExpended((prevState: boolean) => !prevState)
    }

    const openEditTaskModal = () => {
        return(
            <TaskModal onClose={function (): void {
                throw new Error("Function not implemented.");
            } } onSave={function (): void {
                throw new Error("Function not implemented.");
            } } showModal={true} title={""} />
        )
    }

    return (
        <div className="task">
            <div className="task-start">
                <button className="expend-button" onClick={handleExpandClick} >
                    <div className={isExpended ? "arrow-up-task" : "arrow-down-task" } />
                </button>
                <span>{discription}</span>
            </div>
            <div className="task-status">{status}</div>
            <div className="task-icons">
                <img src={pencilIcon} onClick={openEditTaskModal}/>
                <img src={trashIcon} />
            </div>
            <TaskModal onClose={function (): void {
                throw new Error("Function not implemented.");
            } } onSave={function (): void {
                throw new Error("Function not implemented.");
            } } showModal={false} title={""} />
        </div>
    )
}

export default Task

