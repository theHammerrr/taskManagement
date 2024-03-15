export class TaskDoesNotExists extends Error {
    constructor() {
        super("The Task does not exists");
    }
}

export class TaskWithTheSameNameExists extends Error {
    constructor() {
        super("There is another task with the given name");
    }
}