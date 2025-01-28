import type { Meta, StoryObj } from '@storybook/react';

import { WalletBalance } from './WalletBalance';

const meta = {
  title: 'Display Components/WalletBalance',
  component: WalletBalance,
  tags: ['autodocs'],
} satisfies Meta<typeof WalletBalance>;

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

export const WithSol: Story = {
  args: {
    balance: {
      amount: '25.75',
      token: {
        id: '3',
        name: 'Solana',
        symbol: 'SOL',
        blockchain: 'SOL',
        decimals: 9,
        isNative: true,
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};

export const WithAave: Story = {
  args: {
    balance: {
      amount: '12.35',
      token: {
        id: '4',
        name: 'Aave',
        symbol: 'AAVE',
        blockchain: 'ETH',
        decimals: 18,
        isNative: false,
        tokenAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};

export const WithUni: Story = {
  args: {
    balance: {
      amount: '45.67',
      token: {
        id: '5',
        name: 'Uniswap',
        symbol: 'UNI',
        blockchain: 'ETH',
        decimals: 18,
        isNative: false,
        tokenAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        updateDate: '2024-01-22T09:42:00Z',
        createDate: '2024-01-22T09:42:00Z',
      },
      updateDate: '2024-01-22T09:42:00Z',
    },
  },
};
