import type { Meta, StoryObj } from '@storybook/react';

import { WalletDetails } from './WalletDetails';

const meta = {
  title: 'Wallet Components/WalletDetails',
  component: WalletDetails,
  tags: ['autodocs'],
} satisfies Meta<typeof WalletDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sepolia: Story = {
  args: {
    wallet: {
      id: '142e39d4-807f-5e0a-a1ba-8869365cf316',
      state: 'LIVE',
      walletSetId: '70ebad9b-582b-506c-8fcb-6628ff959595',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xf6c9efc84080217ccd13ef6d4a7f26a680f2c713',
      blockchain: 'ETH',
      accountType: 'EOA',
      updateDate: '2024-12-03T10:51:31Z',
      createDate: '2024-12-03T10:51:31Z',
    },
  },
};

export const Polygon: Story = {
  args: {
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      accountType: 'EOA',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};

export const Solana: Story = {
  args: {
    wallet: {
      id: 'd037579b-04d2-57ce-a346-e5ec9dc5d803',
      state: 'LIVE',
      walletSetId: '70ebad9b-582b-506c-8fcb-6628ff959595',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: 'D7igxCh7AzQSNzkQJgfU9vvGwUS3QBnstKwu257bJtBT',
      blockchain: 'SOL',
      accountType: 'EOA',
      updateDate: '2024-12-05T15:09:01Z',
      createDate: '2024-12-05T15:09:01Z',
    },
  },
};
