import { fn } from "@storybook/test";
import InputSection from "../components/InputSection/InputSection";
import results from "../../.jest-test-results.json";
import { withTests } from "@storybook/addon-jest";

export default {
  title: "Example/InputSection",
  tags: ["autodocs"],
  render: (args) => {
    return new InputSection().render();
  },
  argTypes: {},
  decorators: [withTests({ results })],
};

export const InputSectionExample = {
  args: {},
};
