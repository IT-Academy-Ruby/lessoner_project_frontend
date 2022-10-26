import  SignUp from "./SignUp"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/lessoner/SignUp",
  component: SignUp,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => <SignUp {...args} />;
export const Default = Template.bind({});

Default.args = {
  label: 'Default',
};


