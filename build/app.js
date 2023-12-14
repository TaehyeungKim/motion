import { PageComponent } from "./components/page.js";
import { ImageDialog, VideoDialog } from "./components/dialog/media-dialog.js";
import { TodoDialog, TaskDialog } from "./components/dialog/text-dialog.js";
class App {
    constructor(root) {
        this.page = new PageComponent();
        this.page.attachTo(root);
        this.page.addArticle({ type: "video", url: "https://www.youtube.com/watch?v=sVTy_wmn5SU", title: "OMG" });
        this.page.addArticle({ type: "todo", todo1: "a", title: "my todo", todo2: "b", todo3: "c" });
        this.page.addArticle({ type: "task", note: "adada", title: "my note" });
        this.page.addArticle({ type: "image", url: "https://i.namu.wiki/i/GF7pb6fCQhY9pDkW-9TDjEahSj6lXjt2mU7uvKTEGk5BibFDUNEo3lLk5AGCc2E34b0iB3Jp9ihfku1QuJYUuAspUh3QFFOpu_iBH6xUMXZ6lLGGPt7rcb3HWC3r1WQY4gL7D9-MJTpWhXHZ6l9jBw.webp", title: "my image" });
        const newButtons = document.querySelectorAll('.new-button');
        newButtons.forEach(button => button.addEventListener('click', (e) => {
            const target = e.currentTarget;
            const id = target.id;
            let dialog;
            switch (id) {
                case "image":
                    dialog = new ImageDialog();
                    break;
                case "task":
                    dialog = new TaskDialog();
                    break;
                case "todo":
                    dialog = new TodoDialog();
                    break;
                case "video":
                    dialog = new VideoDialog();
                    break;
            }
            dialog.submitEvent = () => this.page.addArticle(dialog.data);
            dialog.attachTo(document.body);
        }));
    }
}
new App(document.getElementById('root'));
