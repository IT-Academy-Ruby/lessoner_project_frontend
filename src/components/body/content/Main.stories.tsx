import  Main from "./Main"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/Main",
  component: Main,
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

const Template: Story = (args) => <Main {...args} />;
export const Default = Template.bind({});

