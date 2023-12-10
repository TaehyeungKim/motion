import { BaseComponent, ComposableComponent } from "../base.js";

export type ArticleType = "image" | "video" | "todo" | "task"

export type DialogInputData = {
    [k in string]: string
}

interface DialogComponentInterface {
    closeDialog(): void;
    submitData(): void;
}

type DialogEventListener = ()=>void

export class DialogComponent extends BaseComponent<'dialog'> implements DialogComponentInterface{

    private _submitEvent?: DialogEventListener;

    set submitEvent(l: DialogEventListener) {
        this._submitEvent = l;
    }

    private _data: DialogInputData = {}

    get data() {return this._data}
    set data(data: DialogInputData) {this._data = data}

    private _backgroundStyle: string = `
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255,255,255,0.3);
        z-index: 10;
    `


    constructor(private contentBox: DialogContentBoxConstructor, public type: ArticleType, ...label: string[]) {
        super('dialog');
        this.setStyle(this._backgroundStyle);
        const box = new this.contentBox(this, type, ...label);
        
        this.addChild(box)

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

class DialogContentHeader extends BaseComponent<'header'> {
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

    constructor(type: ArticleType, private dialogComponent: DialogComponent) {
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

class DialogContentFooter extends BaseComponent<'footer'>{
    private _footerStyle: string = ``

    constructor(component: DialogComponent) {
        super('footer');
        this.setStyle(this._footerStyle)
        const button = document.createElement('button');
        button.textContent = 'submit';
        this._component.appendChild(button);

        button.addEventListener('click', component.submitData())
    }
}

class DialogContentInput extends BaseComponent<'section'> {

    private _labelStyle: string = ``
    private _inputStyle: string = `
    `
    private _labelInputLineStyle: string = `
        display: flex;
        justify-content: space-between;
    `

    constructor(private dialog: DialogComponent, ...label: string[]) {
        super('section');
        label.forEach(label=>{
            const line = document.createElement('div');
            line.setAttribute('style', this._labelInputLineStyle)
            line.appendChild(this.makeLabel(label))
            line.appendChild(this.makeInput(label))
            this.component.appendChild(line)
        })
    }

    private makeLabel(l: string) {
        const label = document.createElement('label');
        label.setAttribute('for', l + '_input');
        label.setAttribute('style', this._labelStyle)
        label.textContent = l;
        return label;
    }

    private makeInput(l: string) {
        const input = document.createElement('input')
        input.setAttribute('style', this._inputStyle)
        input.setAttribute('id', l+'_input');
        input.addEventListener('change', (e: Event)=>{
            const currentTarget = e.currentTarget as HTMLInputElement;
            this.dialog.data = {...this.dialog.data, [l]: currentTarget.value}
        })
        return input
    }
}

interface DialogContentBox extends ComposableComponent{

}

type DialogContentBoxConstructor = {
    new(component: DialogComponent, type: ArticleType, ...label: string[]): DialogContentBox
}
 
export class BasicDialogContentBox extends BaseComponent<'div'> implements DialogContentBox{

    constructor(component: DialogComponent, type: ArticleType, ...label: string[]) {
        super('div');
        this.addChild(new DialogContentHeader(type, component));
        this.addChild(new DialogContentInput(component, ...label))
        this.addChild(new DialogContentFooter(component))
    }
}