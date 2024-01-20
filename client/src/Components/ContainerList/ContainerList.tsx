import React, { useState } from "react";
import './ContainerList.css'
import Task, { eFilterState, iTask } from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";

let tempTaskList: iTask[] = [
    {
        id: 1,
        discription: "משימה 1",
        status: eFilterState.ACTIVE
    },
    {
        id: 2,
        discription: "משימה 1",
        status: eFilterState.COMPLETED
    }
]

const ContainerList: React.FC = () => {
    const [filter, setFilter] = useState(eFilterState.ACTIVE)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)
    const [taskList, setTaskList] = useState<iTask[]>(tempTaskList)

    const handleExpandClick = () => {
        setIsDropdownExpended((prevState: boolean) => !prevState)
    }

    const handleChangeFilter = (value: eFilterState) => {
        if (value === filter) return;

        setIsDropdownExpended(false)
        setFilter(value)
    }

    const handleRemoveTask = (task: iTask) => {
        setTaskList(() =>
            taskList.filter(currentTask => task.id !== currentTask.id)
        )
    }

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" />
            <div className="filter-container">
                <span >
                    סינון לפי:
                </span>
                <DropdownFilter
                    currentFilter={filter}
                    handleChangeFilter={handleChangeFilter}
                    isExpended={isDropdownExpended} />
            </div>
            {
                taskList.map((currentTask: iTask) =>
                    <Task key={currentTask.id} {...currentTask} onRemoveTask={handleRemoveTask} />)
            }
        </div>
    )
}

export default ContainerList