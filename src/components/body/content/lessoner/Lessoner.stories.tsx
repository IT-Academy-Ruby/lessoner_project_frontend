import  Lessoner from "./Lessoner"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/lessoner",
  component: Lessoner,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => <Lessoner {...args} />;
export const Default = Template.bind({});

Default.args = {
  label: 'Default',
};


