import React, { useState } from "react";
import './ContainerList.css'
import Task from "../Task/Task";

enum eFilterState {
    NOT_ACTIVE = 'לא פעיל',
    ACTIVE = 'פעיל'
}

const ContainerList: React.FC = () => {
    const [filter, setFilter] = useState(eFilterState.NOT_ACTIVE)
    const [isStatusExpended, setStatusExpended] = useState<boolean>(false)

    const handleStatusExpandClick = () => {
        setStatusExpended((prevState: boolean) => !prevState)
    }

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" />
            <div className="filterDropdown">
                סינון לפי:
                <button className="dropdownButton" onClick={handleStatusExpandClick}>
                    {filter}
                    <div className={isStatusExpended ? "arrow-up" : "arrow-down" }></div>
                </button>
            </div>
            <Task name="משימה 1"/>
            <Task name="משימה 2"/>
        </div>
    )
}

export default ContainerList