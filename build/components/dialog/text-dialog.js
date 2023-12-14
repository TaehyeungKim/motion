import { BasicDialogComponent } from "./dialog.js";
export class TodoDialog extends BasicDialogComponent {
    constructor() {
        super('todo', 'title', 'todo1', 'todo2', 'todo3');
    }
}
export class TaskDialog extends BasicDialogComponent {
    constructor() {
        super('task', 'title', 'note');
    }
}
