import { ArticleListComponent } from "./components/base.js";

import { PageComponent, PageComponentInterface } from "./components/page.js";
import { ImageArticleComponent } from "./components/items/image.js";
import { VideoArticleComponent } from "./components/items/video.js";
import { ArticleType, BasicDialogContentBox, DialogComponent } from "./components/dialog/dialog.js";
import { ImageDialog, VideoDialog } from "./components/dialog/media-dialog.js";
import { TodoDialog, TaskDialog } from "./components/dialog/text-dialog.js";
import { NoteArticleComponent } from "./components/items/note.js";


class App {
    readonly page: PageComponentInterface
    
    constructor(root: HTMLElement){
        this.page = new PageComponent();
        this.page.attachTo(root)


        // const image = new ArticleListComponent(ImageArticleComponent, "https://picsum.photos/200/300", "good image")
        // image.attachTo(this.page.component)

        
        
        // const video2 = new VideoArticleComponent("https://www.youtube.com/watch?v=ib5bV_dWs9A", "LE SSERAFIM", ArticleListComponent)
        // video2.attachTo(this.page.component)

        

        const newButtons = document.querySelectorAll('.new-button');
        newButtons.forEach(button=>button.addEventListener('click', (e: Event)=>{
            const target = e.currentTarget as HTMLButtonElement;
            const id = target.id as ArticleType

            let dialog: DialogComponent;

            switch(id) {
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
            dialog.submitEvent = ()=>this.page.addArticle(dialog)
            dialog.attachTo(document.body)
        }))


    }
}

const app = new App(document.getElementById('root')! as HTMLElement)


