import { DragListener, DragState } from "./page.js";

export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void
    setStyle(style: string): void;
    addListener(event: keyof DocumentEventMap, l: (e?: Event)=>void): void;
    setClass(...c: string[]): void;
    switchPosition(target: Component, position: InsertPosition): void;
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

    remove() {
        this._component.remove();
        console.log(this)
        return this
    }


    setStyle(style: string) {
        this._component.setAttribute('style', style)
    }

    addListener(event: keyof DocumentEventMap, l: (e: Event)=>void) {
       this._component.addEventListener(event, l) 
    }

    setClass(...c: string[]): void {
        this._component.classList.add(...c);
    }
    removeClass(c: string): void {
        this._component.classList.remove(c);
    }

    switchPosition(target: Component, position: InsertPosition): void {
        target.component.insertAdjacentElement(position, this._component)
    }
}

interface ArticleListComponentInterface extends ComposableComponent {
    setDragListener(l: DragListener): void;
}

export type ArticleListConstructor = {
    new (): ArticleListComponentInterface
}

class ArticleDeleteButtonComponent extends BaseComponent<'button'> implements Component {
    
    private _buttonStyle: string = `
        font-size: 1.3em;
        cursor: pointer;
        
    `

    constructor() {
        super('button')
        this._component.textContent = 'X'
        this.setStyle(this._buttonStyle)
        
    }

}

export interface ArticleComponentI extends ComposableComponent {
    
}

export type ArticleComponentConstructor = {
    new(...data: string[]): ArticleComponentI
}

export class ArticleComponent extends BaseComponent<'section'> implements ArticleComponentI {

    private _articleStyle: string = `
        width: 100%;
    `

    constructor() {
        super('section')
        this.setStyle(this._articleStyle)
    }
}


export class ArticleListComponent extends BaseComponent<'div'> implements ArticleListComponentInterface {

    private dragListener?: DragListener;

    private static _articleListClass: string = 'article'

    private static _buttonContainerStyle: string = `
        poisition: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding: 1.2em;
        
    `

    constructor(private articleConstructor: ArticleComponentConstructor, ...data: string[]) {
        super('div');
        this._component.setAttribute('draggable', 'true')
        this.setClass(ArticleListComponent._articleListClass)

        const article = new this.articleConstructor(...data)
        this.addChild(article)
        const del = this.createDeleteButton();
        this.addChild(del);
        

        this.addListener('dragstart', (e: Event)=>{
            this.notifyObserver('start')
            console.log('start',this)
        })

        this.addListener('dragend', (e: Event)=>{
            this.notifyObserver('end')
            
        })


        this.addListener('dragenter', (e: Event)=>{
            e.stopPropagation();
            
            this.notifyObserver('enter')
            console.log('enter',this)
        })

        this.addListener('dragleave', (e: Event)=>{
            this.notifyObserver('leave')
            
        })

    }

    setDragListener(l: DragListener): void {
        this.dragListener = l
    }

    notifyObserver(state: DragState) {
        
        this.dragListener && this.dragListener(state, this);
    }

    private createDeleteButton(): Component {
        const container = new BaseComponent('div');
        container.setStyle(ArticleListComponent._buttonContainerStyle)

        const button = new ArticleDeleteButtonComponent();
        button.addListener('click', ()=>this.remove())

        container.addChild(button);

        return container   
    }


}