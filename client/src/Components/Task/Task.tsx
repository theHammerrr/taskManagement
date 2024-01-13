import React, { useState } from "react";
import './Task.css'

import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'

interface TaskProps {
    name: string
}

const Task: React.FC<TaskProps> = ({
    name
}: TaskProps) => {
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
                <span>{name}</span>
            </div>
            <div className="task-status">פעיל</div>
            <div className="task-icons">
                <img src={pencilIcon} />
                <img src={trashIcon} />
            </div>
        </div>
    )
}

export default Task

