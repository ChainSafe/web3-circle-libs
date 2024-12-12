import type { Meta, StoryObj } from '@storybook/react';
import { BLOCKCHAIN } from 'web3-circle-sdk';

import { ChainLabel } from './ChainLabel';

const meta = {
  title: 'ChainLabel',
  component: ChainLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ChainLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EthSepolia: Story = {
  args: {
    blockchain: BLOCKCHAIN.ETH_SEPOLIA,
  },
};

export const EthMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.ETH,
  },
};

export const ArbSepolia: Story = {
  args: {
    blockchain: BLOCKCHAIN.ARB_SEPOLIA,
  },
};

export const ArbMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.ARB,
  },
};

export const AvaxFuji: Story = {
  args: {
    blockchain: BLOCKCHAIN.AVAX_FUJI,
  },
};

export const AvaxMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.AVAX,
  },
};

export const PolygonAmoy: Story = {
  args: {
    blockchain: BLOCKCHAIN.MATIC_AMOY,
  },
};

export const PolygonMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.MATIC,
  },
};

export const SolanaDevnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.SOL_DEVNET,
  },
};

export const SolanaMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.SOL,
  },
};

export const NearTestnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.NEAR_TESTNET,
  },
};

export const NearMainnet: Story = {
  args: {
    blockchain: BLOCKCHAIN.NEAR,
  },
};
