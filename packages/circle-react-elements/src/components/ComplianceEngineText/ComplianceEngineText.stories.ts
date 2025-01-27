import type { Meta, StoryObj } from '@storybook/react';

import { ComplianceEngineText } from './ComplianceEngineText';

const meta = {
  title: 'ComplianceEngineText',
  component: ComplianceEngineText,
  tags: ['autodocs'],
} satisfies Meta<typeof ComplianceEngineText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ResultTrue: Story = {
  args: {
    result: true,
  },
};

export const ResultFalse: Story = {
  args: {
    result: false,
  },
};
