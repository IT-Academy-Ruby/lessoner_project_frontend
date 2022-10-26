import  Categories  from "./Categories"
import {Meta, Story} from "@storybook/react";

export default {
  title: "body/content/Categories",
  component: Categories,
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

//👇 We create a “template” of how args map to rendering
const Template: Story = (args) => <Categories {...args} />;
export const Default = Template.bind({});





// export default {
//   title: "Button",
//   component: Button,
//   argTypes: {
//       sizes: {
//           options: ["small", "default", "large"],
//           control: {
//               type:"radio"
//           }
//       },
//       variant: {
//           options: ["primary", "secondary"],
//           control: {
//               type:"radio"
//           }
//       }
//   }
