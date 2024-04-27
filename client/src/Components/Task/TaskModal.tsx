import React, { useState } from "react";
import {
  eTaskStatus,
  iTask,
  taskPossibleStates,
} from "../../CommonInterfaces/Task";
import { useTasksContext } from "../Contexts/TasksProvider";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import Modal, { iModalProps } from "../Modal/Modal";
import "./TaskModal.css";

interface TaskModalProps extends Omit<iModalProps, "handleOnSave"> {
  givenTask?: iTask;
  title: string;
  onSaveTask: (savedTask: iTask) => void;
}

const demoTask = {
  id: -1,
  description: "",
  status: eTaskStatus.ACTIVE,
};

const UNLINK_TASK_TEXT = "בטל קישור למטרה";
const STATUS_TEXT = "סטטוס:";
const NAME_TEXT = "שם:";
const NAME_PLACEHOLDER = "שם...";
const LINK_TEXT = "קישור למשימה:";

const TaskModal: React.FC<TaskModalProps> = ({
  handleOnClose,
  title,
  onSaveTask,
  givenTask,
}) => {
  const [currentTask, setCurrentTask] = useState<iTask>(givenTask || demoTask); 
  //change to have multipule state for each task propertie, won't need to send an id

  const { findTaskWithId, findPossibleParents, findTaskWithDescription } =
    useTasksContext();
  const [currentParent, setCurrentParent] = useState<iTask | undefined>(
    findTaskWithId(currentTask.parentId)
  );

  const possibleParents = [
    UNLINK_TASK_TEXT,
    ...findPossibleParents(currentTask).map((task) => task.description),
  ];

const handleChangeTask = <T,>(value: T, property: keyof iTask) => {
  setCurrentTask({
    ...currentTask,
    [property]: value,
  });
};

const handleChangeParentDropdown = (parentDiscription: string) => {
  setCurrentParent(findTaskWithDescription(parentDiscription));
};

const handleSave = () => {
  if (!!currentTask.description.trim().length) {
    alert("Can not save while description is empty");
  } else {
    onSaveTask({ ...currentTask, parentId: currentParent?.id });
  }
};

const handleDescriptionChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  handleChangeTask<string>(event.currentTarget.value, "description");
};

const handleDropdownChange = (status: string) => {
  handleChangeTask<eTaskStatus>(status as eTaskStatus, "status");
};

return (
  <Modal handleOnClose={handleOnClose} handleOnSave={handleSave}>
    <div className="modal-children">
      <span className="title">{title}</span>
      <div className="property-container">
        <span>{NAME_TEXT}</span>
        <input
          value={currentTask.description}
          placeholder={NAME_PLACEHOLDER}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="property-container">
        <span>{STATUS_TEXT}</span>
        <DropdownFilter
          currentFilter={currentTask.status}
          handleClickItem={handleDropdownChange}
          possibleStates={taskPossibleStates}
        />
      </div>
      <div className="property-container">
        <span>{LINK_TEXT}</span>
        <DropdownFilter
          currentFilter={currentParent?.description || UNLINK_TASK_TEXT}
          handleClickItem={handleChangeParentDropdown}
          possibleStates={possibleParents}
        />
      </div>
    </div>
  </Modal>
);
};

export default TaskModal;
