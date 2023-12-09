export interface Base {
    attachTo(parent: HTMLElement, position?: InsertPosition): void
}

export class BaseComponent<T extends keyof HTMLElementTagNameMap> implements Base{
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
}

export class ArticleComponent<T extends keyof HTMLElementTagNameMap> extends BaseComponent<T> {
    attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
        const li = document.createElement('li');
        li.appendChild(this._component);
        parent.insertAdjacentElement(position, li)
    }
}