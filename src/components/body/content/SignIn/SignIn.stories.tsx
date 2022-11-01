import  Sign_in from "./SignIn"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/SignIn",
  component: Sign_in,
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

const Template: Story = (args) => <Sign_in {...args} />;
export const Default = Template.bind({});

