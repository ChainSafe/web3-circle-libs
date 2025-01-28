import type { Meta, StoryObj } from '@storybook/react';

import { getExplorerUrl } from '~/lib/utils';

import { Notification } from './Notification';

const meta = {
  title: 'Notification',
  component: Notification,
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Wallet: Story = {
  args: {
    onClose: () => console.log('Close'),
    title: 'New Wallet Created',
    description: (
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
    description: (
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
    description: 'Transaction was successfully sent',
    externalLink: getExplorerUrl(
      'ETH',
      '0x573924a77b548b1883b8fa163f70dcdf37321564507d332ca19682532631c7c9',
    ),
  },
};
