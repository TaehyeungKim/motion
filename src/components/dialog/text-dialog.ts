import { DialogComponent, BasicDialogContentBox } from "./dialog.js";

export class TodoDialog extends DialogComponent<"todo"> {
    constructor() {
        super(BasicDialogContentBox, 'todo', 'title', 'todo1', 'todo2', 'todo3')
    }
}

export class TaskDialog extends DialogComponent<"task"> {
    constructor() {
        super(BasicDialogContentBox, 'task', 'title', 'note')
    }
}