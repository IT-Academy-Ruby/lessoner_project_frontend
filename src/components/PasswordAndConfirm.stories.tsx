import PasswordAndConfirm, {PasswordProps} from "./PasswordAndConfirm";
import { Meta, Story } from "@storybook/react";

export default {
  title: "PasswordAndConfirm",
  component: PasswordAndConfirm,
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

const Template: Story <PasswordProps> = (args) => <PasswordAndConfirm {...args} />;
export const Default = Template.bind({});
