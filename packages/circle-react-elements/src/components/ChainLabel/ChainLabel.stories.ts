import type { Meta, StoryObj } from '@storybook/react';

import { ChainLabel } from './ChainLabel';

const meta = {
  title: 'Blockchain Components/ChainLabel',
  component: ChainLabel,
  tags: ['autodocs'],
  argTypes: {
    blockchain: {
      control: 'select',
      options: [
        'ARB-SEPOLIA',
        'ARB',
        'AVAX-FUJI',
        'AVAX',
        'ETH-SEPOLIA',
        'ETH',
        'EVM-TESTNET',
        'EVM',
        'MATIC-AMOY',
        'MATIC',
        'NEAR-TESTNET',
        'NEAR',
        'SOL-DEVNET',
        'SOL',
        'UNI-SEPOLIA',
        'UNI',
      ],
    },
  },
} satisfies Meta<typeof ChainLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EthereumSepolia: Story = {
  args: {
    blockchain: 'ETH-SEPOLIA',
  },
};

export const Ethereum: Story = {
  args: {
    blockchain: 'ETH',
  },
};

export const ArbitrumSepolia: Story = {
  args: {
    blockchain: 'ARB-SEPOLIA',
  },
};

export const Arbitrum: Story = {
  args: {
    blockchain: 'ARB',
  },
};

export const AvalancheFuji: Story = {
  args: {
    blockchain: 'AVAX-FUJI',
  },
};

export const Avalanche: Story = {
  args: {
    blockchain: 'AVAX',
  },
};

export const PolygonAmoy: Story = {
  args: {
    blockchain: 'MATIC-AMOY',
  },
};

export const Polygon: Story = {
  args: {
    blockchain: 'MATIC',
  },
};

export const SolanaDevnet: Story = {
  args: {
    blockchain: 'SOL-DEVNET',
  },
};

export const Solana: Story = {
  args: {
    blockchain: 'SOL',
  },
};

export const NearTestnet: Story = {
  args: {
    blockchain: 'NEAR-TESTNET',
  },
};

export const Near: Story = {
  args: {
    blockchain: 'NEAR',
  },
};

export const UnichainSepolia: Story = {
  args: {
    blockchain: 'UNI-SEPOLIA',
  },
};

export const Unichain: Story = {
  args: {
    blockchain: 'UNI',
  },
};
