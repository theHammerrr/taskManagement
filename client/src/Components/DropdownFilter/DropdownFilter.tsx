import React from "react";

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
  return (
    <div className="filter">
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleClickItem(event.target.value)
        }
        value={currentFilter}
      >
        {possibleStates.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
