import type { Meta, StoryObj } from '@storybook/react';

import { TransactionTableHead } from './TransactionTableHead';

const meta = {
  title: 'TransactionTableHead',
  component: TransactionTableHead,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionTableHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
