import React, { useEffect, useState } from "react";
import './DropdownFilter.css'

interface iDropdownFilterProps {
    currentFilter: string,
    handleClickItem: (state: string) => void,
    isExpended: boolean, 
    possibleStates: string[],
    clickDropdownCallback?: (prevState: boolean) => void
}

const DropdownFilter: React.FC<iDropdownFilterProps> = ({
    currentFilter,
    handleClickItem,
    possibleStates,
    isExpended,
    clickDropdownCallback
}: iDropdownFilterProps )=> {
    const [currentState, setCurrentState] = useState<boolean>(isExpended)
    
    const handleExpandClick = () => {
        setCurrentState((prevState) => !prevState)

        if (clickDropdownCallback) clickDropdownCallback(isExpended)
    }

    useEffect(() => {
        setCurrentState(isExpended)
    }, [isExpended])

    return (
        <div className="filter">
            <div className="filter-dropdown">
                <button className="dropdown-button" onClick={handleExpandClick}>
                    <span className="filter-state">{currentFilter}</span>
                    <div className={(currentState ? "arrow-up" : "arrow-down") + " arrow-filter"} />
                </button>
                <div className={
                    (currentState ?
                        "dropdown-content-show" :
                        "dropdown-content-hide") +
                    " dropdown-content"}>
                    {possibleStates.map((status) =>
                        <button
                            key={status}
                            className={(status === currentFilter ? "chosen-status" : "") + " dropdown-item"}
                            onClick={() => handleClickItem(status)}>
                            <span >{status}</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DropdownFilter