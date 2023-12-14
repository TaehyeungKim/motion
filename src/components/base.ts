export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void
    setStyle(style: string): void;
    setClass(...c: string[]): void;
    removeClass(c: string): void;
    addListener(event: keyof DocumentEventMap, l: (e?: Event)=>void): void;
    remove(): Component
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

    remove(): typeof this {
        this._component.remove();
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

