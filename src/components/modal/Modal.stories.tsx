import  Modal  from "./Modal"
import {Meta, Story} from "@storybook/react";

export default {
  title: "Modal",
  component: Modal,
  argTypes: {
    sizes: {
        options: ["small", "default", "large"],
        control: {
            type:"radio"
        }
    },
    variant: {
        options: ["primary", "secondary"],
        control: {
            type:"radio"
        }
    }
}
} as Meta;

const Template: Story = (args) => <Modal {...args} />;
export const Default = Template.bind({});

