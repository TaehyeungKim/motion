import { BaseComponent } from '../base.js';
export class ArticleComponent extends BaseComponent {
    constructor() {
        super('section');
        this._articleStyle = `
        width: 100%;
    `;
        this.setStyle(this._articleStyle);
    }
}
class ArticleListDeleteButtonComponent extends BaseComponent {
    constructor() {
        super('button');
        this._buttonStyle = `
        font-size: 1.3em;
        cursor: pointer;
        
    `;
        this._component.textContent = 'X';
        this.setStyle(this._buttonStyle);
    }
}
export class ArticleListComponent extends BaseComponent {
    constructor(articleConstructor, ...data) {
        super('div');
        this.articleConstructor = articleConstructor;
        this._component.setAttribute('draggable', 'true');
        this.setClass(ArticleListComponent._articleListClass);
        const article = new this.articleConstructor(...data);
        this.addChild(article);
        const del = this.createDeleteButton();
        this.addChild(del);
        this.addListener('dragstart', (e) => {
            this.notifyObserver('start');
        });
        this.addListener('dragend', (e) => {
            this.notifyObserver('end');
        });
        this.addListener('dragenter', (e) => {
            e.stopPropagation();
            this.notifyObserver('enter');
        });
        this.addListener('dragleave', (e) => {
            this.notifyObserver('leave');
        });
    }
    setDragListener(l) {
        this.dragListener = l;
    }
    notifyObserver(state) {
        this.dragListener && this.dragListener(state, this);
    }
    createDeleteButton() {
        const container = new BaseComponent('div');
        container.setStyle(ArticleListComponent._buttonContainerStyle);
        const button = new ArticleListDeleteButtonComponent();
        button.addListener('click', () => this.remove());
        container.addChild(button);
        return container;
    }
}
ArticleListComponent._articleListClass = 'article';
ArticleListComponent._buttonContainerStyle = `
        poisition: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding: 1.2em;
        
    `;
