import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from './index';
import { fullMockTransaction } from './stories/__mocks__/transactions';

type Story = StoryObj<typeof Transaction.Root>;

const meta = {
  title: 'Transaction Components/Transaction',
  component: Transaction.Root,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code
            .replace(/<Transaction/g, '<Transaction.')
            .replace(/<\/Transaction/g, '</Transaction.'),
      },
      description: {
        component: `
Transaction components work together to create a flexible transaction table:

Key features:
- Flexible column configuration
- Automatic header generation
- Responsive design
- Color-coded states and amounts
- Blockchain explorer integration

\`\`\`tsx
<Transaction.Table>
  <Transaction.Table.Head />
  <Transaction.Table.Body>
    {transactions.map(tx => (
      <Transaction.Root key={tx.id} transaction={tx}>
        <Transaction.Address type="from" />
        <Transaction.Address type="to" />
        <Transaction.Status />
        <Transaction.Token />
        <Transaction.Amount />
        <Transaction.Date />
        <Transaction.Actions />
      </Transaction.Root>
    ))}
  </Transaction.Table.Body>
</Transaction.Table>
\`\`\`
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Story />
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
} satisfies Meta<typeof Transaction.Root>;

export default meta;

/**
 * Shows a complete transaction row with all available columns.
 * This is how transactions are typically displayed in a table layout.
 */
export const Default: Story = {
  args: {
    transaction: fullMockTransaction,
    onClickDetails: () => alert('Details clicked'),
  },
  render: ({ transaction, onClickDetails }) => (
    <Transaction.Root transaction={transaction} onClickDetails={onClickDetails}>
      <Transaction.Address type="from" />
      <Transaction.Address type="to" />
      <Transaction.Status />
      <Transaction.Token />
      <Transaction.Amount />
      <Transaction.Date />
      <Transaction.Actions />
    </Transaction.Root>
  ),
};

/**
 * Shows only essential transaction information.
 * Use this layout when space is limited or when less detail is needed.
 */
export const MinimalColumns: Story = {
  args: {
    transaction: fullMockTransaction,
  },
  render: ({ transaction }) => (
    <Transaction.Root transaction={transaction}>
      <Transaction.Token />
      <Transaction.Amount />
      <Transaction.Date />
    </Transaction.Root>
  ),
};

/**
 * Shows transaction without action buttons.
 * Useful for read-only transaction displays.
 */
export const WithoutActions: Story = {
  args: {
    transaction: fullMockTransaction,
  },
  render: ({ transaction }) => (
    <Transaction.Root transaction={transaction}>
      <Transaction.Address type="from" />
      <Transaction.Address type="to" />
      <Transaction.Status />
      <Transaction.Token />
      <Transaction.Amount />
      <Transaction.Date />
    </Transaction.Root>
  ),
};

/**
 * Shows multiple transactions in a table.
 * This is how transactions are typically displayed in a list.
 */
export const MultipleTransactions: Story = {
  render: () => (
    <Transaction.Table>
      <Transaction.Table.Head />
      <Transaction.Table.Body>
        <Transaction.Root
          transaction={fullMockTransaction}
          onClickDetails={() => alert('Details clicked')}
        >
          <Transaction.Address type="from" />
          <Transaction.Address type="to" />
          <Transaction.Status />
          <Transaction.Token />
          <Transaction.Amount />
          <Transaction.Date />
          <Transaction.Actions />
        </Transaction.Root>
        <Transaction.Root
          transaction={{
            ...fullMockTransaction,
            id: '5678',
            transactionType: 'INBOUND',
          }}
          onClickDetails={() => alert('Details clicked')}
        >
          <Transaction.Address type="from" />
          <Transaction.Address type="to" />
          <Transaction.Status />
          <Transaction.Token />
          <Transaction.Amount />
          <Transaction.Date />
          <Transaction.Actions />
        </Transaction.Root>
      </Transaction.Table.Body>
    </Transaction.Table>
  ),
};
