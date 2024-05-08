import TodoListApp from "./components/TodoListApp.js";

const el = document.getElementById("app");

const todoListApp = new TodoListApp(el);
todoListApp.render();
