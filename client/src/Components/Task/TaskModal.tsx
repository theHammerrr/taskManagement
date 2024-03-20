import React, { useEffect, useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { iTask } from "../../CommonInterfaces/Task";
import "./TaskModal.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import {
  findTaskWithDescription,
  findTaskWithId,
  findPossibleParents,
} from "../../axios/handleData";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";

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

const UNLINK_TASK_TEXT: string = "בטל קישור למטרה";

const TaskModal: React.FC<TaskModalProps> = ({
  handleOnClose,
  title,
  onSaveTask,
  givenTask,
}) => {
  const [currentTask, setTask] = useState<iTask>(givenTask ?? demoTask);
  const [currentParent, setCurrentParent] = useState<iTask | undefined>(
    findTaskWithId(currentTask.parentId)
  );

  const possibleParents: string[] = [UNLINK_TASK_TEXT];
  possibleParents.push(
    ...findPossibleParents(currentTask).map((task) => task.description)

  );

  type taskProperties = keyof iTask;
  const handleChangeTask = <T,>(value: T, property: taskProperties) => {
    setTask({
      ...currentTask,
      [property]: value,
    });
  };

  const handleChangeParentDropdown = (parentDescription: string) => {
    setCurrentParent(findTaskWithDescription(parentDescription));
  };

  const handleSave = () => {
    const newParentId = currentParent?.id ?? undefined;
    onSaveTask({ ...currentTask, parentId: newParentId });

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
        <div className="input-container">
          <span>שם:</span>
          <input
            className="input"
            value={currentTask.description}
            placeholder="שם..."
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="dropdown-status">
          <span>סטטוס:</span>
          <DropdownFilter
            currentFilter={currentTask.status}
            handleClickItem={handleDropdownChange}
            possibleStates={Object.values(eTaskStatus)}
          />
        </div>
        <div className="dropdown-lint-task">
          <span>קישור למשימה:</span>
          <DropdownFilter
            currentFilter={currentParent?.description ?? UNLINK_TASK_TEXT}
            handleClickItem={handleChangeParentDropdown}
            possibleStates={possibleParents}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
