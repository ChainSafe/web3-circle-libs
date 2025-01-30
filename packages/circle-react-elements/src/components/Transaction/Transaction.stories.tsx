import type { Blockchain } from '@circle-fin/developer-controlled-wallets';
import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from './index';

const meta = {
  title: 'Transaction Components/Transaction',
  component: Transaction.Root,
  tags: ['autodocs'],
  argTypes: {
    transaction: {
      control: 'object',
      description: 'Transaction data to display',
    },
    onClickDetails: {
      description: 'Callback when details button is clicked',
      type: 'function',
    },
  },
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
 * Shows a transaction with all available columns.
 */
export const Default: StoryObj<typeof meta> = {
  args: {
    transaction: mockTransaction,
    onClickDetails: () => alert('Details clicked'),
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
 */
export const MinimalColumns: StoryObj<typeof meta> = {
  args: {
    transaction: mockTransaction,
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
 */
export const WithoutActions: StoryObj<typeof meta> = {
  args: {
    transaction: mockTransaction,
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
 */
export const MultipleTransactions: StoryObj<typeof meta> = {
  args: {
    transaction: mockTransaction,
  },
  render: () => (
    <Transaction.Table>
      <Transaction.Table.Head />
      <Transaction.Table.Body>
        <Transaction.Root transaction={mockTransaction}>
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
