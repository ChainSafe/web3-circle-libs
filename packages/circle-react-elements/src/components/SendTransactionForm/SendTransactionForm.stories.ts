import type { Meta, StoryObj } from '@storybook/react';

import { SendTransactionForm } from './SendTransactionForm';

const meta = {
  title: 'SendTransactionForm',
  component: SendTransactionForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SendTransactionForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {
      console.log('submit');
    },
    isSubmitting: false,
    onChangeAddress: (address) => {
      console.log(address);
    },
    balances: [
      {
        amount: '100000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104ee',
          name: 'USDC',
          standard: 'ERC20',
          blockchain: 'ETH',
          isNative: false,
          symbol: 'USDC',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
      {
        amount: '200000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104e2',
          name: 'ETH',
          blockchain: 'ETH',
          isNative: true,
          symbol: 'ETH',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
    ],
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: () => {
      console.log('submit');
    },
    isSubmitting: true,
    balances: [
      {
        amount: '100000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104ee',
          name: 'USDC',
          standard: 'ERC20',
          blockchain: 'ETH',
          isNative: false,
          symbol: 'USDC',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
      {
        amount: '200000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104e2',
          name: 'ETH',
          blockchain: 'ETH',
          isNative: true,
          symbol: 'ETH',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
    ],
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};
export const ServerError: Story = {
  args: {
    onSubmit: () => {
      console.log('submit');
    },
    isSubmitting: false,
    serverError: new Error('Some server error'),
    balances: [
      {
        amount: '100000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104ee',
          name: 'USDC',
          standard: 'ERC20',
          blockchain: 'ETH',
          isNative: false,
          symbol: 'USDC',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
      {
        amount: '200000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104e2',
          name: 'ETH',
          blockchain: 'ETH',
          isNative: true,
          symbol: 'ETH',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
    ],
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};
export const InvalidAddress: Story = {
  args: {
    onSubmit: () => {
      console.log('submit');
    },
    isSubmitting: false,
    screeningAddressResult: 'DENIED',
    balances: [
      {
        amount: '100000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104ee',
          name: 'USDC',
          standard: 'ERC20',
          blockchain: 'ETH',
          isNative: false,
          symbol: 'USDC',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
      {
        amount: '200000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104e2',
          name: 'ETH',
          blockchain: 'ETH',
          isNative: true,
          symbol: 'ETH',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
    ],
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};
export const ValidAddress: Story = {
  args: {
    onSubmit: () => {
      console.log('submit');
    },
    isSubmitting: false,
    screeningAddressResult: 'APPROVED',
    balances: [
      {
        amount: '100000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104ee',
          name: 'USDC',
          standard: 'ERC20',
          blockchain: 'ETH',
          isNative: false,
          symbol: 'USDC',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
      {
        amount: '200000',
        token: {
          id: '36b6931a-873a-56a8-8a27-b706b17104e2',
          name: 'ETH',
          blockchain: 'ETH',
          isNative: true,
          symbol: 'ETH',
          tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
          updateDate: '2024-12-09T14:38:51Z',
          createDate: '2024-12-09T14:38:51Z',
        },
        updateDate: '2024-12-09T14:38:51Z',
      },
    ],
    wallet: {
      id: 'f5576d55-4432-5dcc-8b3c-582bd530b46b',
      state: 'LIVE',
      walletSetId: '2adf744c-2d31-58ca-85eb-d432ecc7611c',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xc9758de68b17837dadf51616ac77d634bca848d5',
      blockchain: 'MATIC-AMOY',
      updateDate: '2024-12-09T14:38:51Z',
      createDate: '2024-12-09T14:38:51Z',
    },
  },
};
