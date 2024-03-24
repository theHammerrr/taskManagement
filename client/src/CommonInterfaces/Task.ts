export enum eTaskStatus {
    ACTIVE = 'פעיל',
    COMPLETED = 'הושלם'
}

export interface iTask {
    id: number,
    description: string,
    status: eTaskStatus,
    parentId?: number,
}

export const taskPossibleStates = Object.values(eTaskStatus)