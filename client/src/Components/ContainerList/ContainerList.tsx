import React, { useState } from "react";
import './ContainerList.css'
import Task, { eFilterState } from "../Task/Task";

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
            <Task discription="משימה 1" status={eFilterState.ACTIVE}/>
            <Task discription="משימה 2" status={eFilterState.ACTIVE}/>
        </div>
    )
}

export default ContainerList