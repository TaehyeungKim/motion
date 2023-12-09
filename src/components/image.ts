import { ArticleComponent, BaseComponent } from "./base.js";



class ImageComponent extends BaseComponent<'img'>{
    constructor(url: string) {
        super('img')
        this._component.src = url;
    }
}

class CaptionComponent extends BaseComponent<'p'> {
    constructor(caption: string) {
        super('p');
        this._component.textContent = caption;
    }
}

export class ImageArticleComponent extends ArticleComponent<'section'> {
    private _image: ImageComponent;
    private _caption: CaptionComponent

    constructor(url: string, caption: string) {
        super('section')
        this._image = new ImageComponent(url);
        this._caption = new CaptionComponent(caption);
        
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "beforeend")
        
    }

}