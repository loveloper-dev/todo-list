import StatusCount from "../components/StatusCount/StatusCount";

export default {
  title: "Example/StatusCount",
  tags: ["autodocs"],
  render: (args) => {
    return new StatusCount(args.type, args.count).render();
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
