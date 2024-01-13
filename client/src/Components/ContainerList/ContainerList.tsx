import React, { useState } from "react";
import './ContainerList.css'
import Task from "../Task/Task";

enum eFilterState {
    NOT_ACTIVE = 'לא פעיל',
    ACTIVE = 'פעיל'
}

const ContainerList: React.FC = () => {
    const [filter, setFilter] = useState(eFilterState.NOT_ACTIVE)

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" />
            <div className="filterDropdown">
                סינון לפי:
                <button className="dropdownButton">
                    {filter}
                    <div className="arrow-down"></div>
                </button>
            </div>
            <Task name="משימה 1"/>
            <Task name="משימה 2"/>
        </div>
    )
}

export default ContainerList