import { ArticleComponent, BaseComponent } from "../base.js";
class ImageComponent extends BaseComponent {
    constructor(url) {
        super('img');
        this._component.src = url;
    }
}
class CaptionComponent extends BaseComponent {
    constructor(caption) {
        super('p');
        this._component.textContent = caption;
    }
}
export class ImageArticleComponent extends ArticleComponent {
    constructor(url, caption) {
        super();
        this._image = new ImageComponent(url);
        this._caption = new CaptionComponent(caption);
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "beforeend");
    }
}
