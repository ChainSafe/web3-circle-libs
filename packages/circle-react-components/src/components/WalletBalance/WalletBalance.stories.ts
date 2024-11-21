import type { Meta, StoryObj } from '@storybook/react';

import { WalletBalance } from './WalletBalance';

const meta = {
  title: 'WalletBalance',
  component: WalletBalance,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WalletBalance>;

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
