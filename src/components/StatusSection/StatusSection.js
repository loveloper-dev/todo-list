import StatusCount from "../StatusCount/StatusCount";
import Button from "../Button/Button";
import { STATUS_TYPE, FILTER_TYPE } from "../../constants/todo.constants";

export default class StatusSection {
  constructor(
    $element,
    initialTodoList,
    filterType,
    filterClickEvent,
    clearClickEvent,
  ) {
    this._$element = $element;
    this._todoList = initialTodoList;
    this._filterType = filterType;
    this._filterClickEvent = filterClickEvent;
    this._clearClickEvent = clearClickEvent;

    this.$statusSection = null;
  }

  update(todoList, filterType) {
    this._todoList = todoList;
    this._filterType = filterType;
    this.render();
  }

  render() {
    if (!this._$element) {
      this._$element = document.createElement("div");
      this._$element.id = "statusSection";
    }

    this._$element.innerHTML = null;

    // 잔여 할 일 / 완료 할 일 상태 출력 영역
    const $statusWrapper = document.createElement("div");
    $statusWrapper.className = "status-wrapper";
    $statusWrapper.appendChild(
      new StatusCount(
        STATUS_TYPE.ACTIVE,
        this._todoList.filter((todo) => !todo.isChecked).length,
      ).render(),
    );
    $statusWrapper.appendChild(
      new StatusCount(
        STATUS_TYPE.COMPLETED,
        this._todoList.filter((todo) => todo.isChecked).length,
      ).render(),
    );
    this._$element.appendChild($statusWrapper);

    // 보기 타입 버튼 영역
    const $filterWrapper = document.createElement("div");
    $filterWrapper.className = "filter-wrapper";

    $filterWrapper.appendChild(
      new Button(
        "All",
        this._filterType === FILTER_TYPE.ALL ? "active" : null,
        this._filterClickEvent.bind(this, FILTER_TYPE.ALL),
      ).render(),
    );
    $filterWrapper.appendChild(
      new Button(
        "Active",
        this._filterType === FILTER_TYPE.ACTIVE ? "active" : null,
        this._filterClickEvent.bind(this, FILTER_TYPE.ACTIVE),
      ).render(),
    );
    $filterWrapper.appendChild(
      new Button(
        "Completed",
        this._filterType === FILTER_TYPE.COMPLETED ? "active" : null,
        this._filterClickEvent.bind(this, FILTER_TYPE.COMPLETED),
      ).render(),
    );
    this._$element.appendChild($filterWrapper);

    // 완료된 할 일 제거 버튼
    const $clearWrapper = document.createElement("div");
    $clearWrapper.className = "clear-wrapper";
    $clearWrapper.appendChild(
      new Button(
        "Clear Completed",
        null,
        this._clearClickEvent.bind(this),
      ).render(),
    );
    this._$element.appendChild($clearWrapper);

    return this._$element;
  }
}
