import type { Meta, StoryObj } from '@storybook/react';

import { FormErrorText } from './FormErrorText';

const meta = {
  title: 'FormErrorText',
  component: FormErrorText,
  tags: ['autodocs'],
} satisfies Meta<typeof FormErrorText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is an error message',
  },
};
