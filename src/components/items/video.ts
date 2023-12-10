import { ArticleComponent, BaseComponent } from "../base.js";

class VideoFrameComponent extends BaseComponent<'iframe'> {
    constructor(src: string) {
        super('iframe');
        this._component.src = src;
    }
}

class VideoHeaderComponent extends BaseComponent<'header'> {
    constructor(title: string) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}

export class VideoArticleComponent extends ArticleComponent {

    private _header: VideoHeaderComponent;
    private _frame: VideoFrameComponent;

    constructor(src: string, title: string) {
        super();
        this._header = new VideoHeaderComponent(title);
        this._frame = new VideoFrameComponent(src)

        this._header.attachTo(this._component)
        this._frame.attachTo(this._component, "beforeend");
        
    }
}