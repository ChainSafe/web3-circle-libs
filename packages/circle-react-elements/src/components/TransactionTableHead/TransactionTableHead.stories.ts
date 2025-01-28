import type { Meta, StoryObj } from '@storybook/react';

import { TransactionTableHead } from './TransactionTableHead';

const meta = {
  title: 'Transaction Components/TransactionTableHead',
  component: TransactionTableHead,
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionTableHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithActions: Story = {
  args: { withActions: true },
};
