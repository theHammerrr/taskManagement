import React, { useState } from "react";
import './ContainerList.css'
import Task, { eFilterState, iTask } from "../Task/Task";
import DropdownFilter from "../DropdownFilter/DropdownFilter";

const taskList: iTask[] = [
    {
        discription: "משימה 1",
        status: eFilterState.ACTIVE
    },
    {
        discription: "משימה 1",
        status: eFilterState.NOT_ACTIVE
    }
]

const ContainerList: React.FC = () => {
    const [filter, setFilter] = useState(eFilterState.NOT_ACTIVE)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)

    const handleExpandClick = () => {
        setIsDropdownExpended((prevState: boolean) => !prevState)
    }

    const handleChangeFilter = (value: eFilterState) => {
        if (value === filter) return;

        setIsDropdownExpended(false)
        setFilter(value)
    }

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" />
            <div className="filter-container">
                <span >
                    סינון לפי:
                </span>
                <DropdownFilter currentFilter={filter} handleChangeFilter={handleChangeFilter} isExpended={isDropdownExpended} />
            </div>
            {/* <Task discription="משימה 1" status={eFilterState.ACTIVE} />
            <Task discription="משימה 2" status={eFilterState.ACTIVE} /> */}
            {
                taskList.map((currentTask: iTask) => <Task {...currentTask} />)
            }
        </div>
    )
}

export default ContainerList