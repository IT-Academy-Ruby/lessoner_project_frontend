import PhoneNumber from "./PhoneNumber";
import { Meta, Story } from "@storybook/react";

export default {
  title: "PhoneNumber",
  component: PhoneNumber,
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

const Template: Story = (args) => <PhoneNumber {...args} />;
export const Default = Template.bind({});
