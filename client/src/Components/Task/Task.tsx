import React from "react";
import './Task.css'

import pencilIcon from './pencil.svg'
import trashIcon from './trash.svg'

interface TaskProps {
    name: string
}

const Task: React.FC<TaskProps> = ({
    name
}: TaskProps) => {
    return (
        <div className="task">
            <div className="task-start">
                <div className="arrow-down-task"></div>
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