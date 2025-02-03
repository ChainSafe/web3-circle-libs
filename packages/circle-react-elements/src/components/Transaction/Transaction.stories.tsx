import type { Blockchain } from '@circle-fin/developer-controlled-wallets';
import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from './index';

type Story = StoryObj<typeof Transaction.Root>;

const meta = {
  title: 'Transaction Components/Transaction',
  component: Transaction.Root,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'A composable transaction table system for displaying blockchain transactions',
    docs: {
      description: {
        component: `
Transaction components work together to create a flexible transaction table:

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

Key features:
- Flexible column configuration
- Automatic header generation
- Responsive design
- Color-coded states and amounts
- Blockchain explorer integration
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

const mockTransaction = {
  id: '1234',
  sourceAddress: '0x1234567890abcdef1234567890abcdef12345678',
  destinationAddress: '0x9876543210abcdef1234567890abcdef12345678',
  transactionType: 'OUTBOUND' as const,
  state: 'COMPLETE' as const,
  amounts: ['1000.00'],
  createDate: '2024-01-30T10:00:00Z',
  updateDate: '2024-01-30T10:05:00Z',
  firstConfirmDate: '2024-01-30T10:05:00Z',
  blockchain: 'MATIC-MUMBAI' as Blockchain,
  txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  token: {
    id: 'USDC-MATIC',
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    chain: 'MATIC',
    blockchain: 'MATIC-MUMBAI' as Blockchain,
    isNative: false,
    createDate: '2024-01-30T10:00:00Z',
    updateDate: '2024-01-30T10:00:00Z',
  },
  tokenId: 'USDC-MATIC',
};

/**
 * Shows a complete transaction row with all available columns.
 * This is how transactions are typically displayed in a table layout.
 */
export const Default: Story = {
  args: {
    transaction: mockTransaction,
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
    transaction: mockTransaction,
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
    transaction: mockTransaction,
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
          transaction={mockTransaction}
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
            ...mockTransaction,
            id: '5678',
            transactionType: 'INBOUND' as const,
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
