import { eTaskStatus } from "../CommonInterfaces/TaskStatus";
import { iTask } from "../CommonInterfaces/Task";

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
];

export default taskList