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
    addChild(child, position = "beforeend") {
        this._component.insertAdjacentElement(position, child.component);
    }
    setStyle(style) {
        this._component.setAttribute('style', style);
    }
}
export class ArticleListComponent extends BaseComponent {
    constructor() {
        super('li');
        this._articleListStyle = `
        display: flex;
    `;
        this._buttonContainerStyle = `
        display: flex;
        align-items: center;
        padding: 1.2em;
    `;
        this._buttonStyle = `
        font-size: 1.3em;
        cursor: pointer;
        
    `;
        this.setStyle(this._articleListStyle);
        const del = this.createDeleteButton();
        this.component.appendChild(del);
    }
    createDeleteButton() {
        const area = document.createElement('div');
        area.setAttribute('style', this._buttonContainerStyle);
        const button = document.createElement('button');
        button.setAttribute('style', this._buttonStyle);
        const deleteListener = () => () => this._component.remove();
        button.addEventListener('click', deleteListener());
        button.textContent = 'X';
        area.appendChild(button);
        return area;
    }
}
export class ArticleComponent extends BaseComponent {
    constructor(list) {
        super('section');
        this.list = list;
        this._articleStyle = `
        flex-grow: 1;
    `;
        this.setStyle(this._articleStyle);
    }
    attachTo(parent, position = "afterbegin") {
        const li = new this.list();
        li.addChild(this, "afterbegin");
        li.attachTo(parent, position);
    }
}
