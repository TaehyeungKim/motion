import { BaseComponent } from "../base.js";
import { ArticleComponent } from './item-base.js';
class NoteHeaderComponent extends BaseComponent {
    constructor(title) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}
class NoteContentComponent extends BaseComponent {
    constructor(content) {
        super('article');
        this._component.textContent = content;
    }
}
export class NoteArticleComponent extends ArticleComponent {
    constructor(title, content) {
        super();
        this._header = new NoteHeaderComponent(title);
        this._content = new NoteContentComponent(content);
        this._header.attachTo(this._component);
        this._content.attachTo(this._component, "beforeend");
    }
}
