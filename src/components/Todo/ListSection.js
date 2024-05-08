import Emptyset from "../Emptyset/Emptyset.js";
import TodoItem from "./TodoItem.js";

export default class ListSection {
  constructor($listSection, initialTodoList, itemClickEvent) {
    this._$listSection = $listSection;
    this._todoList = initialTodoList;
    this._itemClickEvent = itemClickEvent;
  }

  update(todoList) {
    this._todoList = todoList;
    this.render();
  }

  render() {
    if (!this._$listSection) {
      this._$listSection = document.createElement("ul");
    }

    this._$listSection.innerHTML = null;
    if (this._todoList.length < 1) {
      this._$listSection.appendChild(
        new Emptyset(
          `✓ There are not to-do items. Please write your first to-do!`,
        ).render(),
      );
    } else {
      const $ul = document.createElement("ul");
      this._todoList.forEach((todo, index) => {
        $ul.appendChild(
          new TodoItem(
            todo.isChecked,
            todo.content,
            this._itemClickEvent.bind(this, index),
          ).render(),
        );
      });
      this._$listSection.appendChild($ul);
    }

    return this._$listSection;
  }
}
