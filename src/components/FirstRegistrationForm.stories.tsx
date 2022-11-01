import FirstRegistrationForm from "./FirstRegistrationForm";
import { Meta, Story } from "@storybook/react";

export default {
  title: "FirstRegistrationForm",
  component: FirstRegistrationForm,
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

const Template: Story = (args) => <FirstRegistrationForm {...args} />;
export const Default = Template.bind({});
