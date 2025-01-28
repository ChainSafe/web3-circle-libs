import type { Meta, StoryObj } from '@storybook/react';

import { WalletSetDetails } from './WalletSetDetails';

const meta = {
  title: 'WalletSetDetails',
  component: WalletSetDetails,
  tags: ['autodocs'],
} satisfies Meta<typeof WalletSetDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    walletSet: {
      id: 'f270e785-0a7b-578d-a43c-bd514fcc4d49',
      custodyType: 'DEVELOPER',
      name: 'Test Wallet Set',
      updateDate: '2024-11-27T10:14:52Z',
      createDate: '2024-11-27T10:14:52Z',
    },
  },
};
