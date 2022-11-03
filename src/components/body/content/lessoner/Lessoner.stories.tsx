import  Lessoner from "./Lessoner"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/lessoner",
  component: Lessoner,
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

const Template: Story = (args) => <Lessoner {...args} />;
export const Default = Template.bind({});

