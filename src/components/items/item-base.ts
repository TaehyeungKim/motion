import { DragListener, DragState } from "../page.js";
import {ComposableComponent, BaseComponent, Component } from '../base.js'


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





//article list - container of the article component

class ArticleListDeleteButtonComponent extends BaseComponent<'button'> implements Component {
    
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

interface ArticleListComponentInterface extends ComposableComponent {
    setDragListener(l: DragListener): void;
}

export type ArticleListConstructor = {
    new (): ArticleListComponentInterface
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
            
        })

        this.addListener('dragend', (e: Event)=>{
            this.notifyObserver('end')
        })


        this.addListener('dragenter', (e: Event)=>{
            e.stopPropagation();
            
            this.notifyObserver('enter')
            
        })

        this.addListener('dragleave', (e: Event)=>{
            this.notifyObserver('leave')
            
        })

    }

    setDragListener(l: DragListener): void {
        this.dragListener = l
    }

    private notifyObserver(state: DragState) {
        
        this.dragListener && this.dragListener(state, this);
    }

    private createDeleteButton(): Component {
        const container = new BaseComponent('div');
        container.setStyle(ArticleListComponent._buttonContainerStyle)

        const button = new ArticleListDeleteButtonComponent();
        button.addListener('click', ()=>this.remove())



        container.addChild(button);

        return container   
    }


}

