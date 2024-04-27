import React from "react";
import "./DropdownFilter.css";

interface iDropdownFilterProps {
  currentFilter: string | undefined;
  handleClickItem: (state: string) => void;
  possibleStates: string[];
}

const DropdownFilter: React.FC<iDropdownFilterProps> = ({
  currentFilter,
  handleClickItem,
  possibleStates,
}: iDropdownFilterProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleClickItem(event.target.value);
  };

  return (
    // <div>
      <select
        className="dropdown-select"
        onChange={handleOnChange}
        value={currentFilter}
      >
        {possibleStates.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    // </div>
  );
};

export default DropdownFilter;
