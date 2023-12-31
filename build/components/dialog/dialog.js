import { BaseComponent } from "../base.js";
export class DialogComponent extends BaseComponent {
    set submitEvent(l) {
        this._submitEvent = l;
    }
    get data() {
        return this._data;
    }
    set data(data) { this._data = data; }
    constructor(type) {
        super('dialog');
        this.type = type;
        this._data = {};
    }
    closeDialog() {
        return () => this._component.remove();
    }
    submitData() {
        return () => {
            this._submitEvent && this._submitEvent();
            this.closeDialog()();
        };
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
    constructor(type, dialog, ...label) {
        super('section');
        this.type = type;
        this.dialog = dialog;
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
        input.addEventListener('input', (e) => {
            const currentTarget = e.currentTarget;
            this.dialog.data = Object.assign(Object.assign({}, this.dialog.data), { [l]: currentTarget.value, type: this.type });
        });
        return input;
    }
}
export class BasicDialogComponent extends DialogComponent {
    constructor(type, ...label) {
        super(type);
        this.setClass(...BasicDialogComponent._bdcClassList);
        this.addChild(new DialogContentHeader(type, this));
        this.addChild(new DialogContentInput(type, this, ...label));
        this.addChild(new DialogContentFooter(this));
    }
}
BasicDialogComponent._bdcClassList = ["modal-dialog", "modal-dialog-centered"];
