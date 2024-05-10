import Emptyset from "../Emptyset/Emptyset";
import TodoItem from "./TodoItem";
import { FILTER_TYPE } from "../../constants/todo.constants";

export default class ListSection {
  constructor($listSection, filterType, initialTodoList, itemClickEvent) {
    this._$listSection = $listSection;
    this._filterType = filterType;
    this._todoList = initialTodoList;
    this._itemClickEvent = itemClickEvent;
  }

  update(filterType, todoList) {
    this._filterType = filterType;
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
          `✓ There are not to-do items. ${this._filterType === FILTER_TYPE.ALL ? "Please write your first to-do!" : "Please use another filter."}`,
        ).render(),
      );
    } else {
      const $ul = document.createElement("ul");
      this._todoList.forEach((todo) => {
        $ul.appendChild(
          new TodoItem(
            todo.isChecked,
            todo.content,
            this._itemClickEvent.bind(this, todo.todoId),
          ).render(),
        );
      });
      this._$listSection.appendChild($ul);
    }

    return this._$listSection;
  }
}
