import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { createDateTransaction } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Date> = {
  title: 'Transaction Components/Transaction/Transaction.Date',
  component: Transaction.Date,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionDate/g, '<Transaction.Date'),
      },
      description: {
        component: `
A table cell component that displays transaction dates:
- Shows human-readable formatted date and time
- Uses consistent date format across the application
- Prefers confirmation date over creation date when available
- Right-aligned for better table layout
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows a transaction with only creation date.
 * The date is formatted according to app standards.
 */
export const CreationDate: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createDateTransaction('2024-02-14T09:00:00Z')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows custom styling applied to the date cell.
 * Demonstrates use of monospace font for better date alignment.
 */
export const CustomStyling: Story = {
  args: {
    className: 'font-mono text-xs',
  },
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={createDateTransaction('2024-02-14T09:00:00Z')}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};
