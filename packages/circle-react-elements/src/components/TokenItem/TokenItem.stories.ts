import type { Meta, StoryObj } from '@storybook/react';

import { TokenItem } from './TokenItem';

const meta = {
  title: 'Token Components/TokenItem',
  component: TokenItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TokenItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sol: Story = {
  args: {
    token: {
      blockchain: 'SOL',
      createDate: '2024-08-12T21:58:31Z',
      decimals: 18,
      id: '9ad91eb5-e152-5d81-b60e-151d5fd2b3d3',
      isNative: true,
      name: 'Solana',
      symbol: 'SOL',
      updateDate: '2024-08-12T21:58:31Z',
    },
  },
};

export const Default: Story = {
  args: {
    token: {
      blockchain: 'ARB-SEPOLIA',
      createDate: '2024-08-12T21:58:31Z',
      decimals: 18,
      id: '9ad91eb5-e152-5d81-b60e-151d5fd2b3d3',
      isNative: true,
      name: 'Arbitrum Ethereum-Sepolia',
      symbol: 'ETH-SEPOLIA',
      updateDate: '2024-08-12T21:58:31Z',
    },
  },
};
