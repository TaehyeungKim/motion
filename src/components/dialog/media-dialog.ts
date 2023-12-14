import { DialogComponent, BasicDialogContentBox } from "./dialog.js";

export class ImageDialog extends DialogComponent<"image"> {
    constructor() {
        super(BasicDialogContentBox, 'image', 'title', 'url')
    }
}

export class VideoDialog extends DialogComponent<"video"> {
    constructor() {
        super(BasicDialogContentBox, 'video', 'title', 'url')
    }
}