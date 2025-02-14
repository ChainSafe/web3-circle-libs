import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { baseTransaction } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Actions> = {
  title: 'Transaction Components/Transaction/Transaction.Actions',
  component: Transaction.Actions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionActions/g, '<Transaction.Actions'),
      },
      description: {
        component: `
A table cell component that provides transaction actions:
- Optional "Details" button when onClickDetails handler is provided
- Link to blockchain explorer (opens in new tab)
- Right-aligned action buttons with consistent spacing
`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows transaction actions with both Details button and explorer link.
 * This is the typical configuration for interactive transaction tables.
 */
export const WithDetailsButton: Story = {
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root
            transaction={baseTransaction}
            onClickDetails={() => alert('Details clicked')}
          >
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

/**
 * Shows transaction actions with only the explorer link.
 * Use this for read-only transaction displays.
 */
export const ExplorerLinkOnly: Story = {
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
 * Shows custom styling applied to the actions cell.
 */
export const CustomStyling: Story = {
  args: {
    className: 'bg-muted/50 rounded-r',
  },
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root
            transaction={baseTransaction}
            onClickDetails={() => alert('Details clicked')}
          >
            <Story />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};
