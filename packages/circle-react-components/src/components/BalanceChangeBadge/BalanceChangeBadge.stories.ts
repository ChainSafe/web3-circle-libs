import type { Meta, StoryObj } from '@storybook/react';

import { BalanceChangeBadge } from './BalanceChangeBadge';

const meta = {
  title: 'BalanceChangeBadge',
  component: BalanceChangeBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BalanceChangeBadge>;

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const NoChange: Story = {
  args: {
    currentBalance: BigInt(150000),
    previousBalance: BigInt(150000),
  },
};

export const Increase: Story = {
  args: {
    currentBalance: BigInt(150000),
    previousBalance: BigInt(100000),
  },
};

export const Decrease: Story = {
  args: {
    currentBalance: BigInt(100000),
    previousBalance: BigInt(150000),
  },
};
