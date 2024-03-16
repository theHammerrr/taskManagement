import React, { useEffect, useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { iTask } from "../../CommonInterfaces/Task";
import "./TaskModal.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import {
  getAllTasks,
  findTaskWithDescription,
  findTaskWithId,
} from "../../axios/handleData";
import { eTaskStatus } from "../../CommonInterfaces/TaskStatus";

interface TaskModalProps extends iModalProps {
  givenTask?: iTask;
  onSave: (choesenData: iTask) => void;
  onClose: () => void;
}

const demoTask = {
  id: -1,
  description: "",
  status: eTaskStatus.ACTIVE,
};

const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  showModal,
  title,
  onSave,
  givenTask,
}) => {
  const allTasks: iTask[] = getAllTasks();

  const [currentTask, setTask] = useState<iTask>(givenTask ?? demoTask);
  const [currentParent, setCurrentParent] = useState<iTask | undefined>(
    findTaskWithId(currentTask.parentId)
  );

  const unlinkTaskText: string = "בטל קישור למטרה";

  const possibleParents: string[] = [unlinkTaskText];

  possibleParents.push(
    ...allTasks
      .filter((task) => task.id !== currentTask.id)
      .map((task) => task.description)
  );

  type taskProperties = keyof iTask;
  const handleChangeTask = <T,>(value: T, property: taskProperties) => {
    setTask({
      ...currentTask,
      [property]: value,
    });
  };

  const handleLinkTaskToParent = (parentDescription: string) => {
    if (parentDescription === unlinkTaskText) {
      const { parentId: _, ...orphanTask }: iTask = currentTask;
      setTask({
        ...orphanTask,
      });
      return;
    }

    const currentParent = findTaskWithId(currentTask.parentId);

    if (!currentParent || currentParent.description !== parentDescription) {
      const newParent = findTaskWithDescription(parentDescription);
      if (newParent) handleChangeTask<number>(newParent?.id, "parentId");
    }
  };

  const handleOnSubmit = () => {
    onSave(currentTask);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeTask<string>(event.currentTarget.value, "description");
  };

  const handleDropdownChange = (status: string) => {
    handleChangeTask<eTaskStatus>(status as eTaskStatus, "status");
  };
  useEffect(() => {
    if (currentTask.parentId) {
      setCurrentParent(findTaskWithId(currentTask.parentId));
    } else {
      setCurrentParent(undefined);
    }
  }, [currentTask.parentId]);

  return (
    <Modal showModal={showModal} title={title}>
      <div className="modal-children">
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
            currentFilter={
              currentParent ? currentParent.description : unlinkTaskText
            }
            handleClickItem={handleLinkTaskToParent}
            possibleStates={possibleParents}
          />
        </div>
        <div className="modal-bottom-buttons">
          <button className="modal-close" onClick={onClose}>
            ביטול
          </button>
          <button className="modal-save" onClick={handleOnSubmit}>
            שמירה
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
