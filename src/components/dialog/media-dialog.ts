import { BasicDialogComponent } from "./dialog.js";

export class ImageDialog extends BasicDialogComponent<"image"> {
    constructor() {
        super('image', 'title', 'url')
    }
}

export class VideoDialog extends BasicDialogComponent<"video"> {
    constructor() {
        super('video', 'title', 'url')
    }
}