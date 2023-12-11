import { ArticleComponent, BaseComponent, ArticleListConstructor } from "../base.js";

class VideoFrameComponent extends BaseComponent<'iframe'> {
    constructor(src: string) {
        super('iframe');
        this._component.src = this.makeEmbedUrl(src);
    }

    private makeEmbedUrl(url: string): string {
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([\w-]{11}))|(?:youtu.be\/([\w-]{11})))/
        
        const template = "https://www.youtube.com/embed/"
        
        const matched = url.match(regExp);
        return matched ? template + matched[1] || template + matched[2] : url   
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