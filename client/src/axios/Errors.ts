export class TaskAlreadyExists extends Error {
    constructor() {
        super("The Task is already exists");
    }
}

export class TaskDoesNotExists extends Error {
    constructor() {
        super("The Task does not exists");
    }
}

export class TaskWithTheSameDescriptionExists extends Error {
    constructor() {
        super("There is another task with the given name");
    }
}