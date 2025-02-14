import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { transactionWithToken, transactionWithoutToken } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Token> = {
  title: 'Transaction Components/Transaction/Transaction.Token',
  component: Transaction.Token,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionToken/g, '<Transaction.Token'),
      },
      description: {
        component: `
A table cell component that displays token information:
- Shows token name and symbol
- Includes token icon when available
- Handles missing token data gracefully with a fallback "-" display
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows a transaction with token information.
 * Displays both the token name and symbol, along with token icon.
 */
export const WithToken: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={transactionWithToken}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows how missing token data is handled.
 * Displays a fallback "-" when no token is available.
 */
export const WithoutToken: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={transactionWithoutToken}>
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};
