import Button from "../components/Button/Button";

export default {
  title: "Example/Button",
  tags: ["autodocs"],
  render: (args) => {
    return new Button(args.text, args.clickEvent).render();
  },
  argTypes: {
    text: {
      control: "text",
    },
  },
};

export const ButtomExample = {
  args: {
    text: "Button",
  },
};
