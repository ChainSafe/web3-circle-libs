import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpRight } from 'lucide-react';

import { getExplorerUrl } from '~/lib/utils';

import { SuccessMessage } from './SuccessMessage';

const meta = {
  title: 'Display Components/SuccessMessage',
  component: SuccessMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Wallet: Story = {
  args: {
    onClose: () => console.log('Close'),
    title: 'New Wallet Created',
    children: (
      <div>
        Your wallet with the name <span className="text-gray-600">My wallet</span> was
        successfully created.
      </div>
    ),
  },
};

export const WalletSet: Story = {
  args: {
    onClose: () => console.log('Close'),
    title: 'New Wallet Set Created',
    children: (
      <div>
        Your wallet set with the name <span className="text-gray-600">My wallet set</span>{' '}
        was successfully created.
      </div>
    ),
  },
};

export const Transaction: Story = {
  args: {
    onClose: () => console.log('Close'),
    title: 'Transaction successful',
    children: (
      <div>
        Transaction was successfully sent
        <a
          className="text-primary"
          href={getExplorerUrl(
            'ETH',
            '0x573924a77b548b1883b8fa163f70dcdf37321564507d332ca19682532631c7c9',
          )}
          target="_blank"
          rel="noreferrer"
        >
          <ArrowUpRight className="inline" />
        </a>
      </div>
    ),
  },
};
