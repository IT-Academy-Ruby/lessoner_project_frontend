import  About  from "./About"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/About",
  component: About,
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

const Template: Story = (args) => <About {...args} />;
export const Default = Template.bind({});


