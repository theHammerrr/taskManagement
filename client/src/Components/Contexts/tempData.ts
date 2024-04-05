import { eTaskStatus, iTask } from "../../CommonInterfaces/Task";

const taskList: iTask[] = [
  {
    id: 1,
    description: "משימה 1",
    status: eTaskStatus.ACTIVE,
  },
  {
    id: 2,
    description: "משימה 2",
    status: eTaskStatus.COMPLETED,
  },
  {
    id: 3,
    description: "משימה 3",
    status: eTaskStatus.COMPLETED,
    parentId: 1
  },
  {
    id: 4,
    description: "משימה 4",
    status: eTaskStatus.COMPLETED,
    parentId: 2
  },
  {
    id: 5,
    description: "משימה 45",
    status: eTaskStatus.COMPLETED,
    parentId: 4
  },
];

export default taskList