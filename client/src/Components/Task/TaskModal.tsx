import React, { useEffect, useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { iTask } from "./Task";
import './TaskModal.css'
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { getAllTasks } from "../../axios/tempData";
import { eFilterState } from "../../CommonInterfaces/FilterState";

interface TaskModalProps extends iModalProps {
    currentTask?: iTask,
}

const TaskModal: React.FC<TaskModalProps> = ({
    onClose,
    showModal,
    title,
    onSave,
    currentTask,
}) => {
    const [task, setTask] = useState<iTask>(currentTask ? currentTask : {
        id: -1,
        discription: "",
        status: eFilterState.ACTIVE
    })

    let allTasks: iTask[] = getAllTasks();
    const possibleParents =
        allTasks.map(task => task.discription)
            .filter(discription => discription !== task.discription)

    type taskProperties = keyof iTask;
    const handleChangeTask = <T,>(
        value: T,
        property: taskProperties) => {
        setTask({
            ...task,
            [property]: value
        })
    }

    const handleAssingParent = (parentDiscription: string) => {
        if (task.taskParant && task.taskParant.discription === parentDiscription) {
            console.log(123);

            const { taskParant: _, ...orphanTask }: iTask = task
            setTask({
                ...orphanTask
            })
        } else {
            const parent: iTask | undefined = allTasks.find(task => task.discription == parentDiscription)

            if (parent) {
                handleChangeTask<iTask>(parent, "taskParant")
            }
        }

    }

    useEffect(() => {
        console.log(task);
    }, [task])

    return (
        <Modal
            showModal={showModal}
            onClose={onClose}
            title={title}
            onSave={onSave}
        >
            <div className="modal-children">
                <div className="input-container">
                    <span>שם:</span>
                    <input
                        className="input"
                        value={task.discription}
                        placeholder="שם..."
                        onChange={(event) => {
                            handleChangeTask<string>(event.currentTarget.value, "discription")
                        }} />
                </div>
                <div className="dropdown-status">
                    <span>סטטוס:</span>
                    <DropdownFilter
                        currentFilter={task.status}
                        handleClickItem={(status) => 
                            handleChangeTask<eFilterState>(status as eFilterState, "status")}
                        isExpended={false}
                        possibleStates={Object.values(eFilterState)} />
                </div>
                <div className="dropdown-assing-parent">
                    <span>קישור למשימה:</span>
                    <DropdownFilter
                        currentFilter={task.taskParant ? task.taskParant.discription : ""}
                        handleClickItem={(parentDiscription) => handleAssingParent(parentDiscription)}
                        isExpended={false}
                        possibleStates={possibleParents} />
                </div>
            </div>
        </Modal>
    )
}

export default TaskModal