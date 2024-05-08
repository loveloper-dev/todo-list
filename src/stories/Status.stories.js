import { fn } from "@storybook/test";
import Status from "../components/Status/Status.js";

export default {
  title: "Example/Status",
  tags: ["autodocs"],
  render: (args) => {
    return new Status(args.type, args.count).render();
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["ACTIVE", "COMPLETED"],
    },
    count: { control: "number" },
  },
};

export const Active = {
  args: {
    type: "ACTIVE",
    count: 0,
  },
};

export const Completed = {
  args: {
    type: "COMPLETED",
    count: 0,
  },
};
