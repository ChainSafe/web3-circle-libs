import type { Meta, StoryObj } from '@storybook/react';

import { Transaction } from '../index';
import { baseTransaction } from './__mocks__/transactions';

const meta: Meta<typeof Transaction.Address> = {
  title: 'Transaction Components/Transaction/Transaction.Address',
  component: Transaction.Address,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: false, // Removes just the control
      table: {
        type: { summary: "'from' | 'to'" },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        transform: (code: string) =>
          code.replace(/<TransactionAddress/g, '<Transaction.Address'),
      },
      description: {
        component: `
A table cell component that displays blockchain addresses:
- Shows truncated addresses for better readability
- Full address available on hover
- Supports both source and destination addresses
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <Transaction.Table>
        <Transaction.Table.Head />
        <Transaction.Table.Body>
          <Transaction.Root transaction={baseTransaction}>
            <Story type="from" />
          </Transaction.Root>
        </Transaction.Table.Body>
      </Transaction.Table>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Shows how the source ('from') address is displayed.
 * The address is automatically truncated for better readability.
 */
export const FromAddress: Story = {
  args: {
    type: 'from',
  },
};

/**
 * Shows how the destination ('to') address is displayed.
 * Like the source address, it's truncated but shows the full address on hover.
 */
export const ToAddress: Story = {
  args: {
    type: 'to',
  },
};

/**
 * Example with custom styling applied to the address cell.
 */
export const CustomStyling: Story = {
  args: {
    type: 'from',
    className: 'font-mono text-primary hover:text-primary/80',
  },
};
