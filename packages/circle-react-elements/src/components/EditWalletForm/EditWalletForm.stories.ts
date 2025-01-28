import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { EditWalletForm } from './EditWalletForm';

const meta = {
  title: 'Form Components/EditWalletForm',
  component: EditWalletForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditWalletForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      id: '142e39d4-807f-5e0a-a1ba-8869365cf316',
      state: 'LIVE',
      walletSetId: '70ebad9b-582b-506c-8fcb-6628ff959595',
      custodyType: 'DEVELOPER',
      refId: '',
      name: 'My Wallet',
      address: '0xf6c9efc84080217ccd13ef6d4a7f26a680f2c713',
      blockchain: 'ETH',
      updateDate: '2024-12-03T10:51:31Z',
      createDate: '2024-12-03T10:51:31Z',
    },
    isSubmitting: false,
    onSubmit: fn(),
    serverError: undefined,
  },
};
