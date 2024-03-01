import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Card } from '@components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Card',
  component: Card,
} as Meta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  title: 'Test Title',
  children: <p>Test Content</p>,
};
