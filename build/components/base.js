export class BaseComponent {
    constructor(tag) {
        this._component = document.createElement(tag);
    }
    get component() {
        return this._component;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.component);
    }
}
export class ArticleComponent extends BaseComponent {
    constructor() {
        super('section');
    }
    attachTo(parent, position = "afterbegin") {
        const li = document.createElement('li');
        li.appendChild(this._component);
        parent.insertAdjacentElement(position, li);
    }
}
