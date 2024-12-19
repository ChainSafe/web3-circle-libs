import type { Meta, StoryObj } from '@storybook/react';

import { TokenSelect } from './TokenSelect';

const meta = {
  title: 'TokenSelect',
  component: TokenSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
