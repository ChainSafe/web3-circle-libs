import type { Meta, StoryObj } from '@storybook/react';

import { TransactionState } from '~/lib/constants';

import { TransactionStateText } from './TransactionStateText';

const meta = {
  title: 'TransactionStateText',
  component: TransactionStateText,
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionStateText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: TransactionState.Complete,
  },
};
