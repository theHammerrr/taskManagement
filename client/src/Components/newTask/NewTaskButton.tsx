import React from "react";
import './NewTaskButton.css'
import newTaskIcon from './newTask.svg'

export interface iButtonProps {
    onClick: () => void
}

const NewTaskButton: React.FC<iButtonProps> = ({
    onClick
}: iButtonProps) => {
    return (
        <>
            <button className="modal-button" onClick={onClick}>
                <img src={newTaskIcon} />
            </button>
        </>
    )
}

export default NewTaskButton