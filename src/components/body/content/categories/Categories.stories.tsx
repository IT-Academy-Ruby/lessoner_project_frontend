import  Categories  from "./Categories"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/Categories",
  component: Categories,
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

const Template: Story = (args) => <Categories {...args} />;
export const Default = Template.bind({});
