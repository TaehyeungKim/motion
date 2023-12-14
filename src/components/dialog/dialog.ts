import { BaseComponent, ComposableComponent } from "../base.js";
import {ArticleType, ARTICLE_DATA_FIELD} from '../meta.js'

type DialogInputData<T extends ArticleType> = {
    [k in ARTICLE_DATA_FIELD[T]]: string
} 

type DialogMetaData<T extends ArticleType> =  {
    type: T
} 

//distributive conditional types
export type DialogData<T> = T extends ArticleType ? Partial<DialogInputData<T> & DialogMetaData<T>> : never


interface DialogComponentInterface {
    closeDialog(): void;
    submitData(): void;
    get data(): Partial<DialogData<ArticleType>>
}

type DialogEventListener = ()=>void


export class DialogComponent<T extends ArticleType> extends BaseComponent<'dialog'> implements DialogComponentInterface {

    private _submitEvent?: DialogEventListener;

    set submitEvent(l: DialogEventListener) {
        this._submitEvent = l;
    }

    private _data: DialogData<ArticleType> = {}

    get data() {
        return this._data
    }
    set data(data: DialogData<ArticleType>) {this._data = data}



    constructor(public type: ArticleType) {
        super('dialog');
        // this.setStyle(this._backgroundStyle);
    }

    closeDialog() {
        return ()=>this._component.remove();
    }

    submitData() {
        return()=>{
            this._submitEvent && this._submitEvent();
            this.closeDialog()()
        }
    }
}

export type DialogComponentT<T> = T extends ArticleType ? DialogComponent<T>:never;




//components in dialog//
class DialogContentHeader<T extends ArticleType> extends BaseComponent<'header'> {
    private _headerStyle: string = `
        display: block;
        text-align: center;
        font-size: 1.4rem;
        position: relative;
        height: fit-content;
    `

    private _closeButtonContainerStyle: string = `
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        
    `

    private _closeButtonStyle: string = `
        position: relative;
        
    `

    constructor(type: ArticleType, private dialogComponent: DialogComponent<T>) {
        super('header');
        this._component.textContent = "New " + type ;
        this.setStyle(this._headerStyle)
        this.makeCloseButton();
        
    }

    makeCloseButton() {
        const container = document.createElement('div');
        container.setAttribute('style', this._closeButtonContainerStyle);
        const button = document.createElement('button');
        button.setAttribute('style', this._closeButtonStyle);
        button.textContent = 'X'
        button.addEventListener('click', this.dialogComponent.closeDialog())
        container.appendChild(button)
        this._component.appendChild(container)
    }
}

class DialogContentFooter<T extends ArticleType> extends BaseComponent<'footer'>{
    private _footerStyle: string = ``

    constructor(component: DialogComponent<T>) {
        super('footer');
        this.setStyle(this._footerStyle)
        const button = document.createElement('button');
        button.textContent = 'submit';
        this._component.appendChild(button);

        button.addEventListener('click', component.submitData())
    }
}

class DialogContentInput<T extends ArticleType> extends BaseComponent<'section'> {

    private _labelStyle: string = ``
    private _inputStyle: string = `
    `
    private _labelInputLineStyle: string = `
        display: flex;
        justify-content: space-between;
    `

    constructor(private type: ArticleType, private dialog: DialogComponent<T>, ...label: (keyof DialogInputData<T>)[]) {
        super('section');
        label.forEach(label=>{
            const line = document.createElement('div');
            line.setAttribute('style', this._labelInputLineStyle)
            line.appendChild(this.makeLabel(label))
            line.appendChild(this.makeInput(label))
            this.component.appendChild(line)
        })
    }

    private makeLabel(l: keyof DialogInputData<T>) {
        const label = document.createElement('label');
        label.setAttribute('for', l + '_input');
        label.setAttribute('style', this._labelStyle)
        label.textContent = l;
        return label;
    }

    private makeInput(l: keyof DialogInputData<T>) {
        const input = document.createElement('input')
        input.setAttribute('style', this._inputStyle)
        input.setAttribute('id', l+'_input');
        input.addEventListener('input', (e: Event)=>{
            const currentTarget = e.currentTarget as HTMLInputElement;
            

            this.dialog.data = {...this.dialog.data, [l]: currentTarget.value, type: this.type}
            
        })
        return input
    }
}

// interface DialogContentBox extends ComposableComponent{

// }

// type DialogContentBoxConstructor<T extends ArticleType> = {
//     new(component: DialogComponent<T>, type: ArticleType, ...label: (keyof DialogInputData<T>)[]): DialogContentBox
// }
 
export class BasicDialogComponent<T extends ArticleType> extends DialogComponent<T> {

    
    private static _bdcClassList: string[] = ["modal-dialog", "modal-dialog-centered"]

    constructor(type: ArticleType, ...label:(keyof DialogInputData<T>)[]) {
        super(type);
        this.setClass(...BasicDialogComponent._bdcClassList)
        this.addChild(new DialogContentHeader(type, this));
        this.addChild(new DialogContentInput(type, this, ...label))
        this.addChild(new DialogContentFooter(this))
    }
}