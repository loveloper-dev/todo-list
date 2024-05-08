import { fn } from "@storybook/test";

import ListSection from "../components/Todo/ListSection";

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
    initialTodoList: [
      { todoNo: 0, isChecked: false, content: "1번 할 일" },
      { todoNo: 1, isChecked: true, content: "2번 할 일" },
    ],
    itemClickEvent: fn(),
  },
};
