import Button, { ButtonProps } from "./Button";
import {Meta, Story} from "@storybook/react";

export default {
  title: "Button",
  component: Button,
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

const Template: Story <ButtonProps> = (args) => <Button {...args} />;
export const Default = Template.bind({});

