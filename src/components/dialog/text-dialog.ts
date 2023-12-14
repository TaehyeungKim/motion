import { BasicDialogComponent } from "./dialog.js";

export class TodoDialog extends BasicDialogComponent<"todo"> {
    constructor() {
        super('todo', 'title', 'todo1', 'todo2', 'todo3')
    }
}

export class TaskDialog extends BasicDialogComponent<"task"> {
    constructor() {
        super('task', 'title', 'note')
    }
}