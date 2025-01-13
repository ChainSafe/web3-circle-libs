import type { Meta, StoryObj } from '@storybook/react';

import { ComplianceEngineText } from './ComplianceEngineText';

const meta = {
  title: 'FormErrorText',
  component: ComplianceEngineText,
  tags: ['autodocs'],
} satisfies Meta<typeof ComplianceEngineText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    result: true,
  },
};
