import Checkbox, { CheckboxProps } from "./Checkbox";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    sizes: {
      options: ["small", "default", "large"],
      control: {
        type: "radio",
      },
    },
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta;

const Template: Story <CheckboxProps> = (args) => <Checkbox {...args} />;
export const Default = Template.bind({});
