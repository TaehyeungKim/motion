import { BaseComponent } from "../base.js";
import { ArticleComponent } from './item-base.js';
class VideoFrameComponent extends BaseComponent {
    constructor(src) {
        super('iframe');
        this._component.src = this.makeEmbedUrl(src);
    }
    makeEmbedUrl(url) {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([\w-]{11}))|(?:youtu.be\/([\w-]{11})))/;
        const template = "https://www.youtube.com/embed/";
        const matched = url.match(regExp);
        return matched ? template + matched[1] || template + matched[2] : url;
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
