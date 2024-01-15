import React, { useState } from "react";
import './Task.css'
import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'

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
                <img src={pencilIcon} />
                <img src={trashIcon} />
            </div>
        </div>
    )
}

export default Task

