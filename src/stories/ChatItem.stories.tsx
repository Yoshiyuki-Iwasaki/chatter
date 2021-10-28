import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ChatItem from "../components/chat/ChatItem";

export default {
  title: "Example/ChatItem",
  component: ChatItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ChatItem>;

const Template: ComponentStory<typeof ChatItem> = args => (
  <ChatItem {...args} />
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
