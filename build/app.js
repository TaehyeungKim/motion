import { PageComponent } from "./components/page.js";
import { ImageArticleComponent } from "./components/image.js";
class App {
    constructor(root) {
        this.page = new PageComponent();
        this.page.attachTo(root);
        const image = new ImageArticleComponent("https://picsum.photos/200/300", "good image");
        image.attachTo(this.page.component);
    }
}
const app = new App(document.getElementById('root'));
