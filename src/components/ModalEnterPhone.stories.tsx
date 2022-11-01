import ModalEnterPhone from "./ModalEnterPhone";
import { Meta, Story } from "@storybook/react";
import {CardProps} from "./ModalEnterPhone"

export default {
  title: "ModalEnterPhone",
  component: ModalEnterPhone,
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

const Template: Story <CardProps> = (args) => <ModalEnterPhone {...args} />;
export const Default = Template.bind({});
