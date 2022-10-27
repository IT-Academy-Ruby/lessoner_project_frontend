import  Header from "./Header"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/Header",
  component: Header,
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

const Template: Story = (args) => <Header {...args} />;
export const Default = Template.bind({});

