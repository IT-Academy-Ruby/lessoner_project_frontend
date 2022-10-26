import  About  from "./About"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/About",
  component: About,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => <About {...args} />;
export const Default = Template.bind({});

Default.args = {
  label: 'Default',
};


