import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Sidebar from "../components/sidebar/Sidebar";

export default {
  title: "Example/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = args => (
  <Sidebar {...args} />
);

export const LoggedIn = Template.bind({});
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
