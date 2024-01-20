import React, { useEffect, useState } from "react";
import './ContainerList.css'
import Task, { eFilterState, iTask } from "../Task/Task";
import DropdownFilter, { eExtraDropdownItems } from "../DropdownFilter/DropdownFilter";
import { debounce } from "../../helpers/debounce";

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
    const [statusFilter, setStatusFilter] = useState<eFilterState | eExtraDropdownItems>(eExtraDropdownItems.ALL)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)
    const [displayTaskList, setDisplayTaskList] = useState<iTask[]>(taskList)

    const searchTasks = (text: string) => {
        setDisplayTaskList(() =>
            taskList.filter(currentTask => currentTask.discription.includes(text))
        )
    }

    const handleTextFilterChange = debounce((value: string) => {
        searchTasks(value)
    }, 300)

    const handleChangeFilter = (value: eFilterState | eExtraDropdownItems) => {
        if (value === statusFilter) return;

        setIsDropdownExpended(false)
        setStatusFilter(value)
        
        if (value === eExtraDropdownItems.ALL) {
            setDisplayTaskList(taskList)
        } else {
            setDisplayTaskList(() => taskList.filter((task: iTask) => task.status === value))
        }

    }

    const handleRemoveTask = (task: iTask) => {
        setDisplayTaskList(() =>
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