import type { Meta, StoryObj } from '@storybook/react';

import { Amount } from './Amount';

const meta = {
  title: 'Token Components/Amount',
  component: Amount,
  tags: ['autodocs'],
} satisfies Meta<typeof Amount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUSDC: Story = {
  args: {
    balance: {
      amount: '60.50',
      token: {
        id: '1',
        name: 'USD Coin',
        symbol: 'USDC',
        blockchain: 'ETH',
        decimals: 6,
        isNative: false,
        tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};

export const WithUSDCLargeAmount: Story = {
  args: {
    balance: {
      amount: '1000000',
      token: {
        id: '1',
        name: 'USD Coin',
        symbol: 'USDC',
        blockchain: 'ETH',
        decimals: 6,
        isNative: false,
        tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};

export const WithEth: Story = {
  args: {
    balance: {
      amount: '1.5',
      token: {
        id: '2',
        name: 'Ethereum',
        symbol: 'ETH',
        blockchain: 'ETH',
        decimals: 18,
        isNative: true,
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};
