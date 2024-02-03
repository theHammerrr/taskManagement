import React, { useEffect, useState } from "react";
import './ContainerList.css'
import Task from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { debounce } from "../../helpers/debounce";
import { getAllTasks } from "../../axios/tempData";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";
import { iTask } from "../../CommonInterfaces/Task";

const ContainerList: React.FC = () => {
    // TODO: change later
    const taskList = getAllTasks()
    const statusFilterAll = "הכל"
    const [statusFilter, setStatusFilter] = useState<eTaskStatus | string>(statusFilterAll)
    const [displayTaskList, setDisplayTaskList] = useState<iTask[]>([])

    const possibleStates = [statusFilterAll, ...Object.values(eTaskStatus)]

    useEffect(() => {
        setDisplayTaskList(getAllTasks())
    }, [])

    const searchTasks = (text: string) => {
        setDisplayTaskList(() =>
            taskList.filter(currentTask => currentTask.description.includes(text))
        )
    }

    const handleTextFilterChange = debounce((value: string) => {
        searchTasks(value)
    }, 300)

    const handleChangeFilter = (value: string ) => {
        if (value === statusFilter) return

        setStatusFilter(value as eTaskStatus | string)

        if (value === statusFilterAll) {
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
            {/* TODO: change to it won't render the function everytime */}
            <input type="text" className="SearchList" onChange={e => handleTextFilterChange(e.target.value)} />
            <div className="filter-container">
                <span >
                    סינון לפי:
                </span>
                <DropdownFilter
                    currentFilter={statusFilter}
                    handleClickItem={handleChangeFilter}
                    possibleStates={possibleStates} />
            </div>
            {
                displayTaskList.map((currentTask: iTask) =>
                    <Task key={currentTask.id} {...currentTask} onRemoveTask={handleRemoveTask} />)
            }
        </div>
    )
}

export default ContainerList