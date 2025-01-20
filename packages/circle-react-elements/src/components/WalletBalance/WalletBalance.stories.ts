import type { Meta, StoryObj } from '@storybook/react';

import { WalletBalance } from './WalletBalance';

const meta = {
  title: 'WalletBalance',
  component: WalletBalance,
  tags: ['autodocs'],
} satisfies Meta<typeof WalletBalance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usdc: Story = {
  args: {
    balance: {
      token: {
        id: '5797fbd6-3795-519d-84ca-ec4c5f80c3b1',
        blockchain: 'ETH',
        tokenAddress: '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238',
        standard: 'ERC20',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6,
        isNative: false,
        updateDate: '2024-01-19T09:14:43Z',
        createDate: '2024-01-19T09:14:43Z',
      },
      amount: '200',
      updateDate: '2024-12-09T15:45:11Z',
    },
  },
};

export const Eth: Story = {
  args: {
    balance: {
      token: {
        id: '979869da-9115-5f7d-917d-12d434e56ae7',
        blockchain: 'ETH',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        isNative: true,
        updateDate: '2023-12-12T14:46:02Z',
        createDate: '2023-12-12T14:46:02Z',
      },
      amount: '0.1',
      updateDate: '2024-12-09T15:45:11Z',
    },
  },
};
