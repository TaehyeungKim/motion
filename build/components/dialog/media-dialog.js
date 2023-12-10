import { DialogComponent, BasicDialogContentBox } from "./dialog.js";
export class ImageDialog extends DialogComponent {
    constructor() {
        super(BasicDialogContentBox, 'image', 'title', 'url');
    }
}
export class VideoDialog extends DialogComponent {
    constructor() {
        super(BasicDialogContentBox, 'video', 'title', 'url');
    }
}
