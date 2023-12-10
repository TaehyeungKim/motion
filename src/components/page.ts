import { BaseComponent, ComposableComponent } from "./base.js";
import { DialogComponent } from "./dialog/dialog.js";
import { ArticleComponent } from "./base.js";
import { ImageArticleComponent } from "./items/image.js";
import { VideoArticleComponent } from "./items/video.js";
import { NoteArticleComponent } from "./items/note.js";
import { TodoArticleComponent } from "./items/todo.js";
import { ArticleListComponent } from "./base.js";

export interface PageComponentInterface extends ComposableComponent{
    addArticle(dialog: DialogComponent): void
}

export class PageComponent extends BaseComponent<'ul'> implements PageComponentInterface{
    
    constructor() {
        super('ul')
    }

    addArticle(dialog: DialogComponent) {
        let newArticle: ArticleComponent;

        switch(dialog.type) {
            case "image":
                newArticle = new ImageArticleComponent(dialog.data.url, dialog.data.title, ArticleListComponent)
                break;
            case "video":
                newArticle = new VideoArticleComponent(dialog.data.url, dialog.data.title, ArticleListComponent);
                break;
            case "task":
                newArticle = new NoteArticleComponent(dialog.data.title, dialog.data.note, ArticleListComponent);
                break;
            case "todo":
                const bodyKeys = Object.keys(dialog.data).filter(key=>key !== "title")
                newArticle = new TodoArticleComponent(dialog.data.title, ArticleListComponent, ...bodyKeys)
                break;
        }
        newArticle.attachTo(this._component)
    }
}