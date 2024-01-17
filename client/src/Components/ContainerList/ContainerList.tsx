import React, { useState } from "react";
import './ContainerList.css'
import Task, { eFilterState } from "../Task/Task";

const ContainerList: React.FC = () => {
    const [filter, setFilter] = useState(eFilterState.NOT_ACTIVE)
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)

    const handleExpandClick = () => {
        setIsDropdownExpended((prevState: boolean) => !prevState)
    }

    const handleChangeFilter = (value: eFilterState) => {
        setFilter(value)
    }

    return (
        <div className="ContainerList">
            <input type="text" className="SearchList" />
            <div className="filter">
                <span>
                    סינון לפי:
                </span>
                <div className="filter-dropdown">
                    <button className="dropdown-button" onClick={handleExpandClick}>
                        <span className="filter-state">{filter}</span>
                        <div className={(isDropdownExpended ? "arrow-up" : "arrow-down") + " arrow-filter"} />
                    </button>
                    <div className={
                        (isDropdownExpended ?
                            "dropdown-content-show" :
                            "dropdown-content-hide") +
                        " dropdown-content"}>
                        {Object.values(eFilterState).map((status) =>
                            <button
                                key={status}
                                className="dropdown-item"
                                onClick={() => handleChangeFilter(status)}>
                                <span >{status}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Task discription="משימה 1" status={eFilterState.ACTIVE} taskParant={null} />
            <Task discription="משימה 2" status={eFilterState.ACTIVE} taskParant={null} />
        </div>
    )
}

export default ContainerList