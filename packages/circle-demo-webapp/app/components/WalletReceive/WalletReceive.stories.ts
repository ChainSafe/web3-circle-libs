import { WalletState } from '@circle-fin/developer-controlled-wallets';
import type { Meta, StoryObj } from '@storybook/react';

import { Blockchain } from '~/lib/constants';

import { WalletReceive } from './WalletReceive';

const meta = {
  title: 'WalletReceive',
  component: WalletReceive,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WalletReceive>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: WalletState.Live,
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: Blockchain.MaticAmoy,
      accountType: 'EOA',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};
