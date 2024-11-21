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

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Interop Wallet',
    user: { name: 'Rob McIntosh', avatar: 'https://github.com/shadcn.png' },
    currentBalance: BigInt(4020620),
    previousBalance: BigInt(4020620),
  },
};
