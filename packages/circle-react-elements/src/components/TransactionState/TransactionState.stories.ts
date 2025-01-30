import type { Meta, StoryObj } from '@storybook/react';

import { TransactionState } from './TransactionState';

const meta = {
  title: 'Feedback & Messaging/TransactionState',
  component: TransactionState,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: [
        'COMPLETE',
        'CONFIRMED',
        'SENT',
        'INITIATED',
        'QUEUED',
        'PENDING_RISK_SCREENING',
        'CANCELLED',
        'DENIED',
        'FAILED',
      ],
    },
  },
} satisfies Meta<typeof TransactionState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Complete: Story = {
  args: {
    state: 'COMPLETE',
  },
};

export const Cancelled: Story = {
  args: {
    state: 'CANCELLED',
  },
};

export const Confirmed: Story = {
  args: {
    state: 'CONFIRMED',
  },
};

export const Sent: Story = {
  args: {
    state: 'SENT',
  },
};

export const Denied: Story = {
  args: {
    state: 'DENIED',
  },
};
export const Failed: Story = {
  args: {
    state: 'FAILED',
  },
};
export const Initiated: Story = {
  args: {
    state: 'INITIATED',
  },
};
export const PendingRiskScreening: Story = {
  args: {
    state: 'PENDING_RISK_SCREENING',
  },
};
export const Queued: Story = {
  args: {
    state: 'QUEUED',
  },
};
