import { BaseComponent } from "./base.js";
export class DialogComponent extends BaseComponent {
    constructor(contentBox, type, ...label) {
        super('dialog');
        this.contentBox = contentBox;
        this._data = {};
        this._backgroundStyle = `
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
    `;
        this.setStyle(this._backgroundStyle);
        const box = new this.contentBox(this, type, ...label);
        this.addChild(box);
    }
    closeDialog() {
        return () => this._component.remove();
    }
    submitData() {
        return this.closeDialog();
    }
}
class DialogContentHeader extends BaseComponent {
    constructor(type, dialogComponent) {
        super('header');
        this.dialogComponent = dialogComponent;
        this._headerStyle = `
        display: block;
        text-align: center;
        font-size: 1.4rem;
        position: relative;
        height: fit-content;
    `;
        this._closeButtonContainerStyle = `
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        
    `;
        this._closeButtonStyle = `
        position: relative;
        
    `;
        this._component.textContent = "New " + type;
        this.setStyle(this._headerStyle);
        this.makeCloseButton();
    }
    makeCloseButton() {
        const container = document.createElement('div');
        container.setAttribute('style', this._closeButtonContainerStyle);
        const button = document.createElement('button');
        button.setAttribute('style', this._closeButtonStyle);
        button.textContent = 'X';
        button.addEventListener('click', this.dialogComponent.closeDialog());
        container.appendChild(button);
        this._component.appendChild(container);
    }
}
class DialogContentFooter extends BaseComponent {
    constructor(component) {
        super('footer');
        this._footerStyle = ``;
        this.setStyle(this._footerStyle);
        const button = document.createElement('button');
        button.textContent = 'submit';
        this._component.appendChild(button);
        button.addEventListener('click', component.submitData());
    }
}
class DialogContentInput extends BaseComponent {
    constructor(...label) {
        super('section');
        this._labelStyle = ``;
        this._inputStyle = `
    `;
        this._labelInputLineStyle = `
        display: flex;
        justify-content: space-between;
    `;
        label.forEach(label => {
            const line = document.createElement('div');
            line.setAttribute('style', this._labelInputLineStyle);
            line.appendChild(this.makeLabel(label));
            line.appendChild(this.makeInput(label));
            this.component.appendChild(line);
        });
    }
    makeLabel(l) {
        const label = document.createElement('label');
        label.setAttribute('for', l + '_input');
        label.setAttribute('style', this._labelStyle);
        label.textContent = l;
        return label;
    }
    makeInput(l) {
        const input = document.createElement('input');
        input.setAttribute('style', this._inputStyle);
        input.setAttribute('id', l + '_input');
        return input;
    }
}
export class BasicDialogContentBox extends BaseComponent {
    constructor(component, type, ...label) {
        super('div');
        this.addChild(new DialogContentHeader(type, component));
        this.addChild(new DialogContentInput(...label));
        this.addChild(new DialogContentFooter(component));
    }
}
