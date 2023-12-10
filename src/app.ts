import { PageComponent } from "./components/page.js";
import { ImageArticleComponent } from "./components/items/image.js";
import { NoteArticleComponent } from "./components/items/note.js";
import { VideoArticleComponent } from "./components/items/video.js";
import { TodoArticleComponent } from "./components/items/todo.js";

class App {
    readonly page: PageComponent

    constructor(root: HTMLElement){
        this.page = new PageComponent();
        this.page.attachTo(root)

        const image = new ImageArticleComponent("https://picsum.photos/200/300", "good image")
        image.attachTo(this.page.component)

        const note = new NoteArticleComponent("New Note", "sfdsfsfs");
        note.attachTo(this.page.component)

        const video = new VideoArticleComponent("https://www.youtube.com/embed/IfMUaBDO3UE", "LE SSERAFIM")
        video.attachTo(this.page.component)

        const todo = new TodoArticleComponent("New Todo", "todo1", "todo2", "todo3")
        todo.attachTo(this.page.component)
    }
}

const app = new App(document.getElementById('root')! as HTMLElement)


