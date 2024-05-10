import { fn } from "@storybook/test";
import { actions } from "@storybook/addon-actions";

import TodoListApp from "../components/TodoListApp";

export default {
  title: "Example/TodoListApp",
  tags: ["autodocs"],
  render: (args) => {
    const $element = document.createElement("div");
    return new TodoListApp($element).render();
  },
  argTypes: {},
};

export const TodoListAppExample = {
  args: {},
};
