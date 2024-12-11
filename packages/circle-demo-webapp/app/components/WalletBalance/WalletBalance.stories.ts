import type { Meta, StoryObj } from '@storybook/react';
import type { BLOCKCHAIN } from 'web3-circle-sdk';

import { WalletBalance } from './WalletBalance';

const meta = {
  title: 'WalletBalance',
  component: WalletBalance,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WalletBalance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Usdc: Story = {
  args: {
    balance: {
      token: {
        id: '5797fbd6-3795-519d-84ca-ec4c5f80c3b1',
        blockchain: 'ETH_SEPOLIA' as BLOCKCHAIN,
        tokenAddress: '0x1c7d4b196cb0c7b01d743fbc6116a902379c7238',
        standard: 'ERC20',
        name: 'USDC',
        symbol: 'USDC',
        decimals: 6,
        isNative: false,
        updateDate: '2024-01-19T09:14:43Z',
        createDate: '2024-01-19T09:14:43Z',
      },
      amount: '20',
      updateDate: '2024-12-09T15:45:11Z',
    },
  },
};

export const Eth: Story = {
  args: {
    balance: {
      token: {
        id: '979869da-9115-5f7d-917d-12d434e56ae7',
        blockchain: 'ETH_SEPOLIA' as BLOCKCHAIN,
        name: 'Ethereum-Sepolia',
        symbol: 'ETH-SEPOLIA',
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
