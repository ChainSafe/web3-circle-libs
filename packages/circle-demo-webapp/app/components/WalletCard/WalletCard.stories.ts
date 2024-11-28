import type { Meta, StoryObj } from '@storybook/react';

import { WalletCard } from './WalletCard';

const meta = {
  title: 'WalletCard',
  component: WalletCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WalletCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Interop Wallet',
    user: { name: 'Rob McIntosh', avatar: 'https://github.com/shadcn.png' },
    currentBalance: BigInt(150000),
    previousBalance: BigInt(100000),
  },
};