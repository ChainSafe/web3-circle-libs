import type { Meta, StoryObj } from '@storybook/react';

import { Blockchain } from '~/lib/constants';

import { ChainIcon } from './ChainIcon';

const meta = {
  title: 'ChainIcon',
  component: ChainIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof ChainIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EthSepolia: Story = {
  args: {
    blockchain: Blockchain.EthSepolia,
  },
};

export const EthMainnet: Story = {
  args: {
    blockchain: Blockchain.Eth,
  },
};

export const ArbSepolia: Story = {
  args: {
    blockchain: Blockchain.ArbSepolia,
  },
};

export const ArbMainnet: Story = {
  args: {
    blockchain: Blockchain.Arb,
  },
};

export const AvaxFuji: Story = {
  args: {
    blockchain: Blockchain.AvaxFuji,
  },
};

export const AvaxMainnet: Story = {
  args: {
    blockchain: Blockchain.Avax,
  },
};

export const PolygonAmoy: Story = {
  args: {
    blockchain: Blockchain.MaticAmoy,
  },
};

export const PolygonMainnet: Story = {
  args: {
    blockchain: Blockchain.Matic,
  },
};

export const SolanaDevnet: Story = {
  args: {
    blockchain: Blockchain.SolDevnet,
  },
};

export const SolanaMainnet: Story = {
  args: {
    blockchain: Blockchain.Sol,
  },
};

export const NearTestnet: Story = {
  args: {
    blockchain: Blockchain.NearTestnet,
  },
};

export const NearMainnet: Story = {
  args: {
    blockchain: Blockchain.Near,
  },
};
