import { v4 as UUID4 } from "uuid";

import TodoListApp from "../components/TodoListApp";
import { SET_TODO_EVENT_TYPE } from "../constants/todo.constants";

describe("Jest Test", () => {
  it("setTodoList", () => {
    const todoList = [
      {
        todoId: "b2bdb2c9-707c-4c66-ae12-577a7f9d5e51",
        isChecked: false,
        content: "1번 업무",
      },
      {
        todoId: "c7bdb2c9-707c-4c66-ae12-531a7f9d5e51",
        isChecked: false,
        content: "2번 업무",
      },
      {
        todoId: "b2bdb272-707c-4c66-ae12-531a7f9d5e51",
        isChecked: true,
        content: "3번 업무",
      },
    ];

    const todoListApp = new TodoListApp();
    todoListApp.setTodoList(
      SET_TODO_EVENT_TYPE.ADD,
      {
        todoId: UUID4(),
        isChecked: false,
        content: "4번 업무",
      },
      todoList,
    );

    const checkTarget = todoList.splice(2, 1)[0];
    checkTarget.isChecked = false;

    todoListApp.setTodoList(SET_TODO_EVENT_TYPE.UNCHECK, checkTarget, todoList);

    expect(todoList[0].isChecked).toBe(false);
    expect(todoList[0].content).toBe("2번 업무");
    expect(todoList[3].isChecked).toBe(true);
    expect(todoList[3].content).toBe("3번 업무");
  });
});
