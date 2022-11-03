import GenderSelector from "./GenderSelector";
import { Meta, Story } from "@storybook/react";

export default {
  title: "GenderSelector",
  component: GenderSelector,
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

const Template: Story = (args) => <GenderSelector {...args} />;
export const Default = Template.bind({});
