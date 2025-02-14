import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { baseTransaction, inboundTransaction } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Amount> = {
  title: 'Transaction Components/Transaction/Transaction.Amount',
  component: Transaction.Amount,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionAmount/g, '<Transaction.Amount'),
      },
      description: {
        component: `
A table cell component that displays transaction amounts with visual indicators:
- Green for inbound transactions (received funds)
- Red for outbound transactions (sent funds)
- Automatic +/- prefix based on transaction type
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows an inbound transaction amount.
 * Amount is displayed in green with a + prefix.
 */
export const InboundAmount: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={inboundTransaction}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows an outbound transaction amount.
 * Amount is displayed in red with a - prefix.
 */
export const OutboundAmount: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={baseTransaction}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows an amount with custom styling.
 * The base styles are preserved while custom classes are applied.
 */
export const CustomStyling: Story = {
  args: {
    className: 'font-bold text-lg',
  },
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={inboundTransaction}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};
