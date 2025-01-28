import type { Meta, StoryObj } from '@storybook/react';

import { ChainSelect } from './ChainSelect';

const meta = {
  title: 'Blockchain Components/ChainSelect',
  component: ChainSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof ChainSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
