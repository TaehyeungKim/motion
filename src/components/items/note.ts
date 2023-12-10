import { BaseComponent, ArticleComponent } from "../base.js";



class NoteHeaderComponent extends BaseComponent<'header'> {
    constructor(title: string) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}

class NoteContentComponent extends BaseComponent<'article'> {
    constructor(content: string) {
        super('article');
        this._component.textContent = content;
    }
}

export class NoteArticleComponent extends ArticleComponent {
    private _header: NoteHeaderComponent;
    private _content: NoteContentComponent;
    
    constructor(title: string, content: string) {
        super();
        this._header = new NoteHeaderComponent(title);
        this._content = new NoteContentComponent(content);

        this._header.attachTo(this._component);
        this._content.attachTo(this._component, "beforeend");
    }

}