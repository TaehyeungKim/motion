import { BasicDialogComponent } from "./dialog.js";
export class ImageDialog extends BasicDialogComponent {
    constructor() {
        super('image', 'title', 'url');
    }
}
export class VideoDialog extends BasicDialogComponent {
    constructor() {
        super('video', 'title', 'url');
    }
}
