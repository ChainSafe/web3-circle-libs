import type { Meta, StoryObj } from '@storybook/react';

import { ComplianceStatus } from './ComplianceStatus';

const meta = {
  title: 'Feedback & Messaging/ComplianceStatus',
  component: ComplianceStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ComplianceStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Approved: Story = {
  args: {
    result: true,
  },
};

export const Denied: Story = {
  args: {
    result: false,
  },
};
