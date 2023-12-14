import { BaseComponent, ComposableComponent } from "./base.js";
import { ArticleListComponent } from "./items/item-base.js";
import { DialogData } from "./dialog/dialog.js";
import { ImageArticleComponent } from "./items/image.js";
import { VideoArticleComponent } from "./items/video.js";
import { NoteArticleComponent } from "./items/note.js";
import { TodoArticleComponent } from "./items/todo.js";
import { ArticleType } from "./meta.js";


export type DragState = "start" | "end" | "enter" | "leave"
export type DragListener = (state: DragState, target: ArticleListComponent) => void;
export interface PageComponentInterface extends ComposableComponent{
    addArticle(data: DialogData<ArticleType>): void
}

export class PageComponent extends BaseComponent<'section'> implements PageComponentInterface{

    private _articles: Set<ArticleListComponent> = new Set();
    private _dragTarget?: ArticleListComponent;
    private _dropTarget?: ArticleListComponent;

    constructor() {
        super("section")
        this.addListener('dragover', (e)=>e.preventDefault())
        this.addListener('drop', (e)=>{e.preventDefault(); this.onDrop()})
    }

    onDrop() {
        if(!this._dragTarget || !this._dropTarget) return ;
        if(this._dragTarget !== this._dropTarget) {
            const p = this._dragTarget.component.compareDocumentPosition(this._dropTarget.component)
            if(p === 2) this._dragTarget.switchPosition(this._dropTarget, "beforebegin")
            else if(p === 4) this._dragTarget.switchPosition(this._dropTarget, "afterend")    
        }
    }

    dragListener(): DragListener {
        return (state: DragState, target: ArticleListComponent) => {
            switch(state) {
                case "start":
                    this._dragTarget = target;
                    this._articles.forEach(article=>article.setClass('mute'))
                    break;
                case "enter":
                    this._dropTarget = target;
                    break;
                case "leave":
                    this._dropTarget = undefined;
                    break;
                case "end":
                    this._dragTarget = undefined;
                    this._articles.forEach(article=>article.removeClass('mute'))
                    break;
                default:
                    throw new Error("unsupported state")
            }
        }
    }


    addArticle(data: DialogData<ArticleType>) {

        let newArticle: ArticleListComponent;

        
        switch(data.type) {
            case "image":
                newArticle = new ArticleListComponent(ImageArticleComponent, data.url as string, data.title as string)
                break;
            case "video":
                newArticle = new ArticleListComponent(VideoArticleComponent, data.url as string, data.title as string)
                break;
            case "task":
                newArticle = new ArticleListComponent(NoteArticleComponent, data.title as string, data.note as string);
                break;
            case "todo":
                const bodyKeys = Object.keys(data).filter(key => key !== "title" && key !== "type") as [keyof Omit<DialogData<"todo">, "type"|"title">]
                const bodyData = bodyKeys.map(key=>data[key]).filter(data=>data !== undefined) as string[]
                newArticle = new ArticleListComponent(TodoArticleComponent, data.title as string,  ...bodyData)
                break;
            default:
                throw new Error("undefined data is set")
        }
        this._articles.add(newArticle)
        newArticle.attachTo(this._component)
        newArticle.setDragListener(this.dragListener())
    }
}