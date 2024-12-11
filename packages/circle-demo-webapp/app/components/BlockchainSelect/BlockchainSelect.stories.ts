import type { Meta, StoryObj } from '@storybook/react';

import { BlockchainSelect } from './BlockchainSelect';

const meta = {
  title: 'BlockchainSelect',
  component: BlockchainSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlockchainSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
