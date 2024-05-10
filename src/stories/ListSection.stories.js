import { fn } from "@storybook/test";
import { v4 as UUID4 } from "uuid";

import ListSection from "../components/Todo/ListSection";
import { FILTER_TYPE } from "../constants/todo.constants";

export default {
  title: "Example/ListSection",
  tags: ["autodocs"],
  render: (args) => {
    const $wrapper = document.createElement("div");
    $wrapper.className = "wrapper";

    const $listSection = document.createElement("ul");
    $listSection.id = "listSection";
    $listSection.appendChild(
      new ListSection(
        args.$listSection,
        args.filterType,
        args.initialTodoList,
        args.itemClickEvent,
      ).render(),
    );

    $wrapper.appendChild($listSection);

    return $wrapper;
  },
};

export const ListSectionExample = {
  args: {
    $listSection: document.createElement("div"),
    filterType: FILTER_TYPE.ALL,
    initialTodoList: [
      {
        todoId: UUID4(),
        isChecked: false,
        content: "1번 할 일",
      },
      {
        todoId: UUID4(),
        isChecked: true,
        content: "2번 할 일",
      },
    ],
    itemClickEvent: fn(),
  },
};
