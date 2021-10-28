import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from '../components/module/Header';

export default {
  title: 'Example/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
