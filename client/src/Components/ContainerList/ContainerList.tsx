import React, { useEffect, useState } from "react";
import './ContainerList.css'
import Task, { iTask } from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import { debounce } from "../../helpers/debounce";
import { getAllTasks } from "../../axios/tempData";
import { eFilterState } from "../../CommonInterfaces/FilterState";


export enum eExtraDropdownItems {
    ALL = "הכל"
}

const ContainerList: React.FC = () => {
    // TODO: change later
    const taskList = getAllTasks()
    const [statusFilter, setStatusFilter] = useState<eFilterState | eExtraDropdownItems>(eExtraDropdownItems.ALL)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)
    const [displayTaskList, setDisplayTaskList] = useState<iTask[]>([])

    useEffect(() => {
        setDisplayTaskList(getAllTasks())
    }, [])

    const searchTasks = (text: string) => {
        setDisplayTaskList(() =>
            taskList.filter(currentTask => currentTask.discription.includes(text))
        )
    }

    const handleTextFilterChange = debounce((value: string) => {
        searchTasks(value)
    }, 300)

    const handleChangeFilter = (value: string ) => {
        if (value === statusFilter) {
            console.log(value);
            
            setIsDropdownExpended(false)
            return;
        }

        setIsDropdownExpended(false)
        setStatusFilter(value as eFilterState | eExtraDropdownItems)
        console.log(value);
        
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

    // useEffect(() => {
    //     console.log('is expended');
        
    //     console.log(isDropdownExpended);
        
    // }, [isDropdownExpended])

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" onChange={e => handleTextFilterChange(e.target.value)} />
            <div className="filter-container">
                <span >
                    סינון לפי:
                </span>
                <DropdownFilter
                    currentFilter={statusFilter}
                    handleClickItem={handleChangeFilter}
                    clickDropdownCallback={(prevState) => setIsDropdownExpended(!prevState)}
                    isExpended={isDropdownExpended}
                    possibleStates={[...Object.values(eExtraDropdownItems), ...Object.values(eFilterState)]} />
            </div>
            {
                displayTaskList.map((currentTask: iTask) =>
                    <Task key={currentTask.id} {...currentTask} onRemoveTask={handleRemoveTask} />)
            }
        </div>
    )
}

export default ContainerList