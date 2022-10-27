import  Footer from "./Footer"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/Footer",
  component: Footer,
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

const Template: Story = (args) => <Footer {...args} />;
export const Default = Template.bind({});

