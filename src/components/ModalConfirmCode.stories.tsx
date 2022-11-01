import ModalConfirmCode, { CardProps } from "./ModalConfirmCode";
import { Meta, Story } from "@storybook/react";

export default {
  title: "ModalConfirmCode",
  component: ModalConfirmCode,
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

const Template: Story <CardProps> = (args) => <ModalConfirmCode {...args} />;
export const Default = Template.bind({});
