import TodoListApp from "../components/TodoListApp";

describe("Jest Test", () => {
  it("setTodoList", () => {
    const todoList = [
      { todoNo: 0, isChecked: false, content: "1번 업무" },
      { todoNo: 1, isChecked: false, content: "2번 업무" },
      { todoNo: 2, isChecked: true, content: "3번 업무" },
    ];

    const todoListApp = new TodoListApp();
    todoListApp.setTodoList(
      "ADD",
      {
        isChecked: false,
        content: "4번 업무",
      },
      todoList,
    );

    const checkTarget = todoList.splice(2, 1)[0];
    checkTarget.isChecked = false;
    todoListApp.setTodoList("UNCHECK", checkTarget, todoList);

    expect(todoList[0].isChecked).toBe(false);
    expect(todoList[0].content).toBe("3번 업무");
    expect(todoList[3].isChecked).toBe(false);
    expect(todoList[3].content).toBe("4번 업무");
  });
});
