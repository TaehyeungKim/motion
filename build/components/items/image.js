import { BaseComponent } from "../base.js";
import { ArticleComponent } from './item-base.js';
class ImageComponent extends BaseComponent {
    constructor(url) {
        super('img');
        this._component.src = url;
        this.setClass(ImageComponent._imageClass);
    }
}
ImageComponent._imageClass = 'image-image';
class ImageHeaderComponent extends BaseComponent {
    constructor(title) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}
export class ImageArticleComponent extends ArticleComponent {
    constructor(url, title) {
        super();
        this._image = new ImageComponent(url);
        this._caption = new ImageHeaderComponent(title);
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "afterbegin");
    }
}
