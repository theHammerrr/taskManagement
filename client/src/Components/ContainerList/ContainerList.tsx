import React, { useEffect, useState } from "react";
import './ContainerList.css'
import Task, { eFilterState, iTask } from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { debounce } from "../helpers/debounce";

let taskList: iTask[] = [
    {
        id: 1,
        discription: "משימה 1",
        status: eFilterState.ACTIVE
    },
    {
        id: 2,
        discription: "משימה 2",
        status: eFilterState.COMPLETED
    }
]

const ContainerList: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState(eFilterState.ACTIVE)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)
    const [displayTaskList, setTaskList] = useState<iTask[]>(taskList)

    const searchTasks = (text: string) => {
        setTaskList(() =>
            taskList.filter(currentTask => currentTask.discription.includes(text))
        )
    }

    const handleTextFilterChange = debounce((value: string) => {
        searchTasks(value)
    }, 300)

    const handleChangeFilter = (value: eFilterState) => {
        if (value === statusFilter) return;

        setIsDropdownExpended(false)
        setStatusFilter(value)
    }

    const handleRemoveTask = (task: iTask) => {
        setTaskList(() =>
            displayTaskList.filter(currentTask => task.id !== currentTask.id)
        )
    }

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" onChange={e => handleTextFilterChange(e.target.value)} />
            <div className="filter-container">
                <span >
                    סינון לפי:
                </span>
                <DropdownFilter
                    currentFilter={statusFilter}
                    handleChangeFilter={handleChangeFilter}
                    isExpended={isDropdownExpended} />
            </div>
            {
                displayTaskList.map((currentTask: iTask) =>
                    <Task key={currentTask.id} {...currentTask} onRemoveTask={handleRemoveTask} />)
            }
        </div>
    )
}

export default ContainerList