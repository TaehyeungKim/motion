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

class ImageHeaderComponent extends BaseComponent<'header'> {
    constructor(title: string) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}

export class ImageArticleComponent extends ArticleComponent {
    private _image: ImageComponent;
    private _caption: ImageHeaderComponent
 
    constructor(url: string, title: string) {
        super()
        this._image = new ImageComponent(url);
        this._caption = new ImageHeaderComponent(title);
        
        this._image.attachTo(this._component);
        this._caption.attachTo(this._component, "afterbegin")
    }

}