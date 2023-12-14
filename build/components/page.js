import { BaseComponent } from "./base.js";
import { ArticleListComponent } from "./items/item-base.js";
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
        if (!this._dragTarget || !this._dropTarget)
            return;
        if (this._dragTarget !== this._dropTarget) {
            const p = this._dragTarget.component.compareDocumentPosition(this._dropTarget.component);
            if (p === 2)
                this._dragTarget.switchPosition(this._dropTarget, "beforebegin");
            else if (p === 4)
                this._dragTarget.switchPosition(this._dropTarget, "afterend");
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
    addArticle(data) {
        let newArticle;
        switch (data.type) {
            case "image":
                newArticle = new ArticleListComponent(ImageArticleComponent, data.url, data.title);
                break;
            case "video":
                newArticle = new ArticleListComponent(VideoArticleComponent, data.url, data.title);
                break;
            case "task":
                newArticle = new ArticleListComponent(NoteArticleComponent, data.title, data.note);
                break;
            case "todo":
                const bodyKeys = Object.keys(data).filter(key => key !== "title" && key !== "type");
                const bodyData = bodyKeys.map(key => data[key]).filter(data => data !== undefined);
                newArticle = new ArticleListComponent(TodoArticleComponent, data.title, ...bodyData);
                break;
            default:
                throw new Error("undefined data is set");
        }
        this._articles.add(newArticle);
        newArticle.attachTo(this._component);
        newArticle.setDragListener(this.dragListener());
    }
}
