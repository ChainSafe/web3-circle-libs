import type { Meta, StoryObj } from '@storybook/react';

import { TestChainSelect } from './TestChainSelect';

const meta = {
  title: 'Blockchain Components/TestChainSelect',
  component: TestChainSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof TestChainSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
