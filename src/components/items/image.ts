import {  BaseComponent } from "../base.js";
import {ArticleComponent} from './item-base.js'



class ImageComponent extends BaseComponent<'img'>{
    private static _imageClass: string = 'image-image'

    constructor(url: string) {
        super('img')
        this._component.src = url;
        this.setClass(ImageComponent._imageClass)
        
    }
}

class CaptionComponent extends BaseComponent<'p'> {
    private static _captionClass: string = 'image-caption'
    constructor(caption: string) {
        super('p');
        this._component.textContent = caption;
        this.setClass(CaptionComponent._captionClass)
    }
}

export class ImageArticleComponent extends ArticleComponent {
    private _image: ImageComponent;
    private _caption: CaptionComponent
 
    constructor(url: string, caption: string) {
        super()
        this._image = new ImageComponent(url);
        this._caption = new CaptionComponent(caption);
        
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "beforeend")
    }

}