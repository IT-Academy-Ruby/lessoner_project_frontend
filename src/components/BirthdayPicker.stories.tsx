import BirthdayPicker from "./BirthdayPicker";
import { Meta, Story } from "@storybook/react";

export default {
  title: "BirthdayPicker",
  component: BirthdayPicker,
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

const Template: Story = (args) => <BirthdayPicker {...args} />;
export const Default = Template.bind({});
