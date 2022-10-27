import  Lessons from "./Lessons"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/lessons",
  component: Lessons,
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

const Template: Story = (args) => <Lessons {...args} />;
export const Default = Template.bind({});

