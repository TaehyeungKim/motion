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
    remove() {
        this._component.remove();
        return this;
    }
    setStyle(style) {
        this._component.setAttribute('style', style);
    }
    addListener(event, l) {
        this._component.addEventListener(event, l);
    }
    setClass(...c) {
        this._component.classList.add(...c);
    }
    removeClass(c) {
        this._component.classList.remove(c);
    }
    switchPosition(target, position) {
        target.component.insertAdjacentElement(position, this._component);
    }
}
