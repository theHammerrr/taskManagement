import React, { useEffect, useState } from "react";
import Modal, { iModalProps } from "../Modal/Modal";
import { iTask } from "../../CommonInterfaces/Task";
import "./TaskModal.css";
import DropdownFilter from "../DropdownFilter/DropdownFilter";
import {
  getAllTasks,
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
  const [currentTask, setTask] = useState<iTask>(
    givenTask ? givenTask : demoTask
  );
  const [currentParentName, setCurrentParentName] = useState<string>(
    findTaskWithId(currentTask.parentId)?.description || UNLINK_TASK_TEXT
  );

  const possibleParents: string[] = [UNLINK_TASK_TEXT];
  possibleParents.push(
    ...findPossibleParents(currentTask).map((task) => task.description)
  );
  console.log(possibleParents);

  type taskProperties = keyof iTask;
  const handleChangeTask = <T,>(value: T, property: taskProperties) => {
    setTask({
      ...currentTask,
      [property]: value,
    });
  };

  const handleLinkTaskToParent = (parentDiscription: string) => {
    if (parentDiscription === UNLINK_TASK_TEXT) {
      const { parentId: _, ...orphanTask }: iTask = currentTask;
      setTask({
        ...orphanTask,
      });
      setCurrentParentName(parentDiscription);
      return;
    }

    const newParent = findTaskWithDescription(parentDiscription);

    if (!newParent) {
      console.log(`could not find the parent ${parentDiscription}`);
    } else {
      handleChangeTask<number>(newParent.id, "parentId");
      setCurrentParentName(parentDiscription);
    }

    // const currentParent = findTaskWithId(currentTask.parentId);

    // if (currentParent && currentParent.description !== parentDiscription) {
    //   const newParent = findTaskWithDescription(parentDiscription);
    //   if (newParent) handleChangeTask<number>(newParent?.id, "parentId");
    // }
  };

  const handleSave = () => {
    onSaveTask(currentTask);
  };

  //   useEffect(() => {
  //     console.log(123);

  //     if (currentTask.parentId) {
  //       setCurrentParent(findTaskWithId(currentTask.parentId));
  //     } else {
  //       setCurrentParent(undefined);
  //     }
  //   }, [currentTask.parentId]);

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
            onChange={(event) => {
              handleChangeTask<string>(
                event.currentTarget.value,
                "description"
              );
            }}
          />
        </div>
        <div className="dropdown-status">
          <span>סטטוס:</span>
          <DropdownFilter
            currentFilter={currentTask.status}
            handleClickItem={(status) =>
              handleChangeTask<eTaskStatus>(status as eTaskStatus, "status")
            }
            possibleStates={Object.values(eTaskStatus)}
          />
        </div>
        <div className="dropdown-lint-task">
          <span>קישור למשימה:</span>
          <DropdownFilter
            currentFilter={currentParentName}
            handleClickItem={(parentDiscription) =>
              handleLinkTaskToParent(parentDiscription)
            }
            possibleStates={possibleParents}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
