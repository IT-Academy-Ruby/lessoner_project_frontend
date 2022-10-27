import  Body from "./Body"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/Body",
  component: Body,
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

const Template: Story = (args) => <Body {...args} />;
export const Default = Template.bind({});

