import { BaseComponent, ArticleComponent } from "../base.js";
class ImageComponent extends BaseComponent {
    constructor(url) {
        super('img');
        this._component.src = url;
        this.setClass(ImageComponent._imageClass);
    }
}
ImageComponent._imageClass = 'image-image';
class CaptionComponent extends BaseComponent {
    constructor(caption) {
        super('p');
        this._component.textContent = caption;
        this.setClass(CaptionComponent._captionClass);
    }
}
CaptionComponent._captionClass = 'image-caption';
export class ImageArticleComponent extends ArticleComponent {
    constructor(url, caption) {
        super();
        this._image = new ImageComponent(url);
        this._caption = new CaptionComponent(caption);
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "beforeend");
    }
}
