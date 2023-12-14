export type ArticleType = "image" | "video" | "todo" | "task"

export type ARTICLE_DATA_FIELD = {
    "image": "url"|"title",
    "video": "url"|"title",
    "task": "title"|"note",
    "todo": "title"|"todo1" | "todo2" | "todo3"
}