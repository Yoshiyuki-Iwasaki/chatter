import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ChatInput from "../components/chat/ChatInput";

export default {
  title: "Example/ChatInput",
  component: ChatInput,
} as ComponentMeta<typeof ChatInput>;

const Template: ComponentStory<typeof ChatInput> = args => <ChatInput {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};
