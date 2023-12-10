import { ArticleComponent, BaseComponent } from "../base.js";
class VideoFrameComponent extends BaseComponent {
    constructor(src) {
        super('iframe');
        this._component.src = src;
    }
}
class VideoHeaderComponent extends BaseComponent {
    constructor(title) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}
export class VideoArticleComponent extends ArticleComponent {
    constructor(src, title) {
        super();
        this._header = new VideoHeaderComponent(title);
        this._frame = new VideoFrameComponent(src);
        this._header.attachTo(this._component);
        this._frame.attachTo(this._component, "beforeend");
    }
}
