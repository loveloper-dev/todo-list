import { v4 as UUID4 } from "uuid";

import InputSection from "./InputSection/InputSection";
import ListSection from "./Todo/ListSection";
import StatusSection from "./StatusSection/StatusSection";
import { FILTER_TYPE, SET_TODO_EVENT_TYPE } from "../constants/todo.constants";

export default class TodoListApp {
  constructor($element) {
    // TodoList 삽입 dom
    this._$element = $element;

    // 첫 렌더(init) 여부
    this.isMounted = false;

    // 현재 보기 타입
    this.filterType = FILTER_TYPE.ALL;

    // 할 일 목록
    this.todoList = [];

    // instances
    this.inputSection = null;
    this.listSection = null;
    this.statusSection = null;

    // nodes
    this.$listSection = null;
    this.$statusSection = null;
  }

  /**
   * 입력영역 초기화
   */
  resetInput() {
    this.inputSection.reset();
  }

  /**
   * ONLY jest용 test case 추가를 위해 생성한 메소드
   * @param {*} type 'ADD' | 'CHECK' | 'UNCHECK'
   * @param {*} todo
   * @param {*} targetTodoList
   */
  setTodoList(type, todo, targetTodoList) {
    switch (type) {
      case SET_TODO_EVENT_TYPE.CHECK:
        targetTodoList.push(todo);
        break;
      case SET_TODO_EVENT_TYPE.ADD:
      case SET_TODO_EVENT_TYPE.UNCHECK:
        targetTodoList.unshift(todo);
        break;
      default:
        targetTodoList.unshift(todo);
        break;
    }
  }

  /**
   * 할 일 추가
   * @param {string} content 할 일 텍스트
   * @returns void
   */
  addTodo(content) {
    if (!content.replace(/\s/g, "")) return;

    this.resetInput();
    this.setTodoList(
      SET_TODO_EVENT_TYPE.ADD,
      { todoId: UUID4(), isChecked: false, content },
      this.todoList,
    );

    this.render();

    return this.todoList;
  }

  /**
   * 할 일 체크 / 해제
   * @param {*} todoId 체크 / 해제 대상 todo의 id
   */
  toggleTodoStatus(todoId) {
    const targetIndex = this.todoList.findIndex(
      (todo) => todo.todoId === todoId,
    );
    const targetTodo = this.todoList.splice(targetIndex, 1)[0];
    targetTodo.isChecked = !targetTodo.isChecked;

    this.setTodoList(
      targetTodo.isChecked
        ? SET_TODO_EVENT_TYPE.CHECK
        : SET_TODO_EVENT_TYPE.UNCHECK,
      targetTodo,
      this.todoList,
    );

    this.render();
  }

  /**
   * 완료된 할 일 제거
   */
  clearCompleted() {
    const isConfirmed = window.confirm("완료된 할 일을 삭제하시겠습니까?");

    if (isConfirmed) {
      this.todoList = this.todoList.filter((todo) => !todo.isChecked);

      this.render();
    }
  }

  /**
   * 할 일 목록 render
   */
  drawTodoList() {
    let todoList = this.todoList;
    switch (this.filterType) {
      case FILTER_TYPE.ALL:
        break;
      case FILTER_TYPE.ACTIVE:
        todoList = todoList.filter((todo) => !todo.isChecked);
        break;
      case FILTER_TYPE.COMPLETED:
        todoList = todoList.filter((todo) => todo.isChecked);
        break;
      default:
        console.error("[drawTodoList] Invalid filterType");
    }

    if (!this.listSection) {
      this.listSection = new ListSection(
        this.$listSection,
        this.filterType,
        this.todoList,
        this.toggleTodoStatus.bind(this),
      );
      this.listSection.render();
      return;
    }

    this.listSection.update(this.filterType, todoList);
  }

  /**
   * 할 일 상태 render
   */
  drawStatusSection() {
    if (!this.statusSection) {
      this.statusSection = new StatusSection(
        this.$statusSection,
        this.todoList,
        this.filterType,
        this.filterTodo.bind(this),
        this.clearCompleted.bind(this),
      );
      this.statusSection.render();
      return;
    }

    this.statusSection.update(this.todoList, this.filterType);
  }

  /**
   * 보기 타입 변경
   * @param {*} type 보기 타입
   */
  filterTodo(type) {
    this.filterType = type;
    this.render();
  }

  render() {
    if (!this.isMounted) {
      this.isMounted = true;
      this.init();
    }

    this.drawTodoList();
    this.drawStatusSection();

    return this._$element;
  }

  init = () => {
    // 1. App Frame
    const $wrapper = document.createElement("div");
    $wrapper.className = "wrapper";

    // 2. title
    const $title = document.createElement("h1");
    $title.innerText = "TODO LIST";
    $wrapper.appendChild($title);

    // 3. todo input 영역
    this.inputSection = new InputSection(this.addTodo.bind(this));
    $wrapper.appendChild(this.inputSection.render());

    // 4. todo list 출력 영역
    this.$listSection = document.createElement("div");
    this.$listSection.id = "listSection";
    $wrapper.appendChild(this.$listSection);

    // 5. status 영역
    this.$statusSection = document.createElement("div");
    this.$statusSection.id = "statusSection";
    $wrapper.appendChild(this.$statusSection);

    this._$element.appendChild($wrapper);
  };
}
