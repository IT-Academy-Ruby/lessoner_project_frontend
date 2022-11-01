import UserName, {UserNameProps} from "./UserName";
import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../store/index"
  
export default {
  title: "UserName",
  component: UserName,
  argTypes: {
    sizes: {
      options: ["small", "default", "large"],
      control: {
        type: "radio",
      },
    },
    variant: {
      options: ["primary", "secondary"],
      control: {
        type: "radio",
      },
    },
  },
} as Meta;

const Template: Story <UserNameProps> = (args) => <Provider store={store}> <UserName {...args} /> </Provider>;
export const Default = Template.bind({});
