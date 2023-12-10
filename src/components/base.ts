export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void
    get component(): HTMLElement;
}

export interface ComposableComponent extends Component {
    addChild(child: Component, position: InsertPosition): void
}

export class BaseComponent<T extends keyof HTMLElementTagNameMap> implements ComposableComponent{
    protected _component: HTMLElementTagNameMap[T];

    constructor(tag: T) {
        this._component = document.createElement(tag);
    }

    get component() {
        return this._component
    }

    attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
        parent.insertAdjacentElement(position, this.component);
    }

    addChild(child: Component, position: InsertPosition = "beforeend"): void {
        this._component.insertAdjacentElement(position, child.component)
    }


    protected setStyle(style: string) {
        this._component.setAttribute('style', style)
    }
}

interface ArticleListComponentInterface extends ComposableComponent {
    createDeleteButton(): void;
}

export type ArticleListConstructor = {
    new (): ArticleListComponentInterface
}

export class ArticleListComponent extends BaseComponent<'li'> implements ArticleListComponentInterface {
    private _articleListStyle: string = `
        display: flex;
    `

    private _buttonContainerStyle: string = `
        display: flex;
        align-items: center;
        padding: 1.2em;
    `

    private _buttonStyle: string = `
        font-size: 1.3em;
        cursor: pointer;
        
    `

    constructor() {
        super('li');
        this.setStyle(this._articleListStyle)
        const del = this.createDeleteButton();  
        this.component.appendChild(del);
    }

    createDeleteButton(): HTMLDivElement {
        const area = document.createElement('div');
        area.setAttribute('style', this._buttonContainerStyle)
        const button = document.createElement('button');
        button.setAttribute('style', this._buttonStyle)
        const deleteListener = () => ()=> this._component.remove();
        button.addEventListener('click', deleteListener())
        button.textContent = 'X';
        area.appendChild(button);
        return area        
    }


}

export class ArticleComponent extends BaseComponent<'section'> {

    private _articleStyle: string = `
        flex-grow: 1;
    `

    constructor(protected list: ArticleListConstructor) {
        super('section')
        this.setStyle(this._articleStyle)
    }


    attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
        const li = new this.list();
        
        li.addChild(this, "afterbegin");
        li.attachTo(parent, position)
    }
}