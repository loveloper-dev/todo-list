import { fn } from "@storybook/test";

import StatusSection from "../components/StatusSection/StatusSection";

export default {
  title: "Example/StatusSection",
  tags: ["autodocs"],
  render: (args) => {
    const $wrapper = document.createElement("div");
    $wrapper.className = "wrapper";
    $wrapper.appendChild(
      new StatusSection(
        args.$element,
        args.initialTodoList,
        args.filterType,
        args.filterClickEvent,
        args.resetClickEvent,
      ).render(),
    );
    return $wrapper;
  },
  argTypes: {
    $element: {
      control: "none",
    },
    filterType: {
      control: { type: "select" },
      options: ["ALL", "ACTIVE", "COMPLETED"],
    },
  },
};

export const StatusSectionExample = {
  args: {
    $element: null,
    initialTodoList: [
      { isChecked: false, content: "1번 할 일" },
      { isChecked: true, content: "2번 할 일" },
    ],
    filterType: "ALL",
    filterClickEvent: fn(),
    resetClickEvent: fn(),
  },
};
