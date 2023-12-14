import { BaseComponent } from "../base.js";
import { ArticleComponent } from './item-base.js';
class TodoHeaderComponent extends BaseComponent {
    constructor(title) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}
class TodoListComponent extends BaseComponent {
    constructor(...todos) {
        super('ul');
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo;
            this.component.appendChild(li);
        });
    }
}
class TodoContentComponent extends BaseComponent {
    constructor(...todos) {
        super('article');
        const todoList = new TodoListComponent(...todos);
        todoList.attachTo(this._component);
    }
}
export class TodoArticleComponent extends ArticleComponent {
    constructor(title, ...todos) {
        super();
        this._header = new TodoHeaderComponent(title);
        this._content = new TodoContentComponent(...todos);
        this._header.attachTo(this._component);
        this._content.attachTo(this._component, "beforeend");
    }
}
