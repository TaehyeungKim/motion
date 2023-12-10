import { PageComponent } from "./components/page.js";
import { ImageDialog, VideoDialog } from "./components/dialog/media-dialog.js";
import { TodoDialog, TaskDialog } from "./components/dialog/text-dialog.js";
class App {
    constructor(root) {
        this.page = new PageComponent();
        this.page.attachTo(root);
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
            dialog.submitEvent = () => this.page.addArticle(dialog);
            dialog.attachTo(document.body);
        }));
    }
}
const app = new App(document.getElementById('root'));
