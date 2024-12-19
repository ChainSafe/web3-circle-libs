import type { Meta, StoryObj } from '@storybook/react';

import { Blockchain } from '~/lib/constants';

import { TransactionTableRow } from './TransactionTableRow';

const meta = {
  title: 'TransactionTableRow',
  component: TransactionTableRow,
  tags: ['autodocs'],
} satisfies Meta<typeof TransactionTableRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    transaction: {
      id: 'c0d471be-f36f-5e26-8962-9ebd38ec8a62',
      blockchain: Blockchain.MaticAmoy,
      tokenId: '36b6931a-873a-56a8-8a27-b706b17104ee',
      walletId: '24d1ad14-cf0c-5d7d-96d1-aca6447d0fdc',
      sourceAddress: '0x2da2bf0a07b015ffa80821df8b2203d473964d95',
      destinationAddress: '0xf6c9efc84080217ccd13ef6d4a7f26a680f2c713',
      transactionType: 'INBOUND',
      custodyType: 'DEVELOPER',
      state: 'COMPLETE',
      transactionScreeningEvaluation: { screeningDate: '2024-12-10T13:52:57Z' },
      amounts: ['30'],
      nfts: null,
      txHash: '0x1aac3dd232d02797fb6c340cbda7d118fce0561aa7f78049f32ba167b0eaf225',
      blockHash: '0x3bd9054deae68d0d5087da188f119eab2160c12c8a255668e6190c60ffed9ff6',
      blockHeight: 15439404,
      networkFee: '0.005164650002582325',
      firstConfirmDate: '2024-12-10T13:52:57Z',
      operation: 'TRANSFER',
      abiParameters: null,
      createDate: '2024-12-10T13:52:57Z',
      updateDate: '2024-12-10T13:54:43Z',
    },
  },
};
