import { ArticleComponent, BaseComponent } from "../base.js";

class TodoHeaderComponent extends BaseComponent<'header'> {
    constructor(title: string) {
        super('header');
        const h = document.createElement('h2');
        h.textContent = title;
        this._component.appendChild(h);
    }
}

class TodoListComponent extends BaseComponent<'ul'> {
    constructor(...todos: string[]) {
        super('ul');
        todos.forEach(todo=>{
            const li = document.createElement('li');
            li.textContent = todo;
            this.component.appendChild(li);
        })
    }
}

class TodoContentComponent extends BaseComponent<'article'> {
    constructor(...todos: string[]) {
        super('article');
        const todoList = new TodoListComponent(...todos);
        todoList.attachTo(this._component);
    }
}

export class TodoArticleComponent extends ArticleComponent {
    private _header: TodoHeaderComponent;
    private _content: TodoContentComponent;

    constructor(title: string, ...todos: string[]) {
        super();
        this._header = new TodoHeaderComponent(title);
        this._content = new TodoContentComponent(...todos);

        this._header.attachTo(this._component);
        this._content.attachTo(this._component, "beforeend");
    }
}