import React, { useEffect, useState } from "react";

// TODO: Add first option for first state when nothing is selected yet.

interface iDropdownFilterProps {
  currentFilter: string | undefined,
  handleClickItem: (state: string) => void,
  possibleStates: string[]
}

const DropdownFilter: React.FC<iDropdownFilterProps> = ({
  currentFilter,
  handleClickItem,
  possibleStates
}: iDropdownFilterProps) => {
  return (
    <div className="filter">
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleClickItem(event.target.value)
        }
        value={currentFilter}
      >
        {/* {(placeholder && !currentFilter) && <option
          key={placeholder}
          value={placeholder}
          disabled
          selected
          hidden
        >
          {placeholder}
        </option>} */}
        {possibleStates.map((value) => (
          <option
            key={value}
            value={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
