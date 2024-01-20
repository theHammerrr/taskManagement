import React, { useState } from "react";
import { eFilterState } from "../Task/Task";
import './DropdownFilter.css'

export enum eExtraDropdownItems {
    ALL = "הכל"
}

interface iDropdownFilterProps {
    currentFilter: eFilterState | eExtraDropdownItems,
    handleChangeFilter: (status: eFilterState | eExtraDropdownItems) => void,
    isExpended: boolean
}

const DropdownFilter: React.FC<iDropdownFilterProps> = ({
    currentFilter,
    handleChangeFilter
}: iDropdownFilterProps) => {
    const [isDropdownExpended, setIsDropdownExpended] = useState<boolean>(false)

    const handleExpandClick = () => {
        setIsDropdownExpended((prevState: boolean) => !prevState)
    }

    const handleClickFilter = (value: eFilterState | eExtraDropdownItems) => {
        handleChangeFilter(value)
        if (value === currentFilter) return;

        setIsDropdownExpended(false)
    }

    return (
        <div className="filter">
            <div className="filter-dropdown">
                <button className="dropdown-button" onClick={handleExpandClick}>
                    <span className="filter-state">{currentFilter}</span>
                    <div className={(isDropdownExpended ? "arrow-up" : "arrow-down") + " arrow-filter"} />
                </button>
                <div className={
                    (isDropdownExpended ?
                        "dropdown-content-show" :
                        "dropdown-content-hide") +
                    " dropdown-content"}>
                    {[...Object.values(eExtraDropdownItems), ...Object.values(eFilterState)].map((status) =>
                        <button
                            key={status}
                            className={(status === currentFilter ? "chosen-status" : "") + " dropdown-item"}
                            onClick={() => handleClickFilter(status)}>
                            <span >{status}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DropdownFilter