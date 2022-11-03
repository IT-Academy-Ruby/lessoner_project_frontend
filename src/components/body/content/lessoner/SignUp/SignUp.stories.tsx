import  SignUp from "./SignUp"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/lessoner/SignUp",
  component: SignUp,
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

const Template: Story = (args) => <SignUp {...args} />;
export const Default = Template.bind({});



