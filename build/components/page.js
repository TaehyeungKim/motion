import { ArticleListComponent, BaseComponent } from "./base.js";
import { ImageArticleComponent } from "./items/image.js";
import { VideoArticleComponent } from "./items/video.js";
import { NoteArticleComponent } from "./items/note.js";
import { TodoArticleComponent } from "./items/todo.js";
export class PageComponent extends BaseComponent {
    constructor() {
        super("section");
        this._articles = new Set();
        this.addListener('dragover', (e) => e.preventDefault());
        this.addListener('drop', (e) => { e.preventDefault(); this.onDrop(); });
    }
    onDrop() {
        console.log(this._dragTarget, this._dropTarget);
        if (!this._dragTarget || !this._dropTarget)
            return;
        if (this._dragTarget !== this._dropTarget) {
            this._dragTarget.switchPosition(this._dropTarget, "beforebegin");
        }
    }
    dragListener() {
        return (state, target) => {
            switch (state) {
                case "start":
                    this._dragTarget = target;
                    this._articles.forEach(article => article.setClass('mute'));
                    break;
                case "enter":
                    this._dropTarget = target;
                    break;
                case "leave":
                    this._dropTarget = undefined;
                    break;
                case "end":
                    this._dragTarget = undefined;
                    this._articles.forEach(article => article.removeClass('mute'));
                    break;
                default:
                    throw new Error("unsupported state");
            }
        };
    }
    addArticle(dialog) {
        let newArticle;
        switch (dialog.type) {
            case "image":
                newArticle = new ArticleListComponent(ImageArticleComponent, dialog.data.url, dialog.data.title);
                break;
            case "video":
                newArticle = new ArticleListComponent(VideoArticleComponent, dialog.data.url, dialog.data.title);
                break;
            case "task":
                newArticle = new ArticleListComponent(NoteArticleComponent, dialog.data.title, dialog.data.note);
                break;
            case "todo":
                const bodyKeys = Object.keys(dialog.data).filter(key => key !== "title");
                newArticle = new ArticleListComponent(TodoArticleComponent, dialog.data.title, ...bodyKeys);
                break;
        }
        this._articles.add(newArticle);
        newArticle.attachTo(this._component);
        newArticle.setDragListener(this.dragListener());
    }
}
