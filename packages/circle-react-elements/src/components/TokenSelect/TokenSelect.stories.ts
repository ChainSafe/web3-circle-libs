import { Balance } from '@circle-fin/developer-controlled-wallets';
import type { Meta, StoryObj } from '@storybook/react';

import { TokenSelect } from './TokenSelect';

const exampleBalances: Balance[] = [
  {
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
    amount: '1000.50',
    updateDate: '2024-01-22T09:42:00Z',
  },
  {
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
    amount: '1.5',
    updateDate: '2024-01-22T09:42:00Z',
  },
  {
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
    amount: '10.75',
    updateDate: '2024-01-22T09:42:00Z',
  },
];

const meta = {
  title: 'Token Components/TokenSelect',
  component: TokenSelect,
  parameters: {
    layout: 'centered', // Centers the component in the story canvas
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    balances: [],
  },
};

export const WithBalances: Story = {
  args: {
    balances: exampleBalances,
  },
};

export const DefaultToUSDC: Story = {
  args: {
    balances: exampleBalances,
    defaultToUsdc: true,
  },
};
