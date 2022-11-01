import Email, { EmailProps } from "./Email";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Email",
  component: Email,
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

const Template: Story <EmailProps> = (args) => <Email {...args} />;
export const Default = Template.bind({});
