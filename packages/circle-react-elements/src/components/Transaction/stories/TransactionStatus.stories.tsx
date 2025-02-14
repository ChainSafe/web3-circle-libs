import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { createMockTransaction } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Status> = {
  title: 'Transaction Components/Transaction/Transaction.Status',
  component: Transaction.Status,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionStatus/g, '<Transaction.Status'),
      },
      description: {
        component: `
A table cell component that displays transaction states with color-coding:
- Green for successful states (COMPLETE, CONFIRMED)
- Yellow for in-progress states (SENT, INITIATED, QUEUED)
- Red for error states (CANCELLED, DENIED, FAILED)
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows a completed transaction state.
 * Uses green color coding to indicate success.
 */
export const Complete: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createMockTransaction('COMPLETE')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows an in-progress transaction state.
 * Uses yellow color coding to indicate ongoing process.
 */
export const InProgress: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createMockTransaction('SENT')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows a failed transaction state.
 * Uses red color coding to indicate error.
 */
export const Failed: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createMockTransaction('FAILED')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows a pending risk screening state.
 * Uses yellow color coding to indicate processing.
 */
export const PendingRiskScreening: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createMockTransaction('PENDING_RISK_SCREENING')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};
