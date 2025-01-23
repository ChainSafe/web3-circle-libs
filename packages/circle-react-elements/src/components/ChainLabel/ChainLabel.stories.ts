import type { Meta, StoryObj } from '@storybook/react';

import { ChainLabel } from './ChainLabel';

const meta = {
  title: 'ChainLabel',
  component: ChainLabel,
  tags: ['autodocs'],
} satisfies Meta<typeof ChainLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EthSepolia: Story = {
  args: {
    blockchain: 'ETH-SEPOLIA',
  },
};

export const EthMainnet: Story = {
  args: {
    blockchain: 'ETH',
  },
};

export const ArbSepolia: Story = {
  args: {
    blockchain: 'ARB-SEPOLIA',
  },
};

export const ArbMainnet: Story = {
  args: {
    blockchain: 'ARB',
  },
};

export const AvaxFuji: Story = {
  args: {
    blockchain: 'AVAX-FUJI',
  },
};

export const AvaxMainnet: Story = {
  args: {
    blockchain: 'AVAX',
  },
};

export const PolygonAmoy: Story = {
  args: {
    blockchain: 'MATIC-AMOY',
  },
};

export const PolygonMainnet: Story = {
  args: {
    blockchain: 'MATIC',
  },
};

export const SolanaDevnet: Story = {
  args: {
    blockchain: 'SOL-DEVNET',
  },
};

export const SolanaMainnet: Story = {
  args: {
    blockchain: 'SOL',
  },
};

export const NearTestnet: Story = {
  args: {
    blockchain: 'NEAR-TESTNET',
  },
};

export const NearMainnet: Story = {
  args: {
    blockchain: 'NEAR',
  },
};

export const UniSepolia: Story = {
  args: {
    blockchain: 'UNI-SEPOLIA',
  },
};
