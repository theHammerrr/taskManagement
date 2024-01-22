import { eFilterState } from "../CommonInterfaces/FilterState";
import { iTask } from "../Components/Task/Task";

const taskList: iTask[] = [
    {
        id: 1,
        discription: "משימה 1",
        status: eFilterState.ACTIVE
    },
    {
        id: 2,
        discription: "משימה 2",
        status: eFilterState.COMPLETED
    }
]

// export const getAllTasks = (): iTask[] => taskList
export const getAllTasks = (): iTask[] => {
    return taskList
}
