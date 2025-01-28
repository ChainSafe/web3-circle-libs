import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { EditWalletSetForm } from './EditWalletSetForm';

const meta = {
  title: 'EditWalletSetForm',
  component: EditWalletSetForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditWalletSetForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValues: {
      id: 'f270e785-0a7b-578d-a43c-bd514fcc4d49',
      custodyType: 'DEVELOPER',
      name: 'Test Wallet Set',
      updateDate: '2024-11-27T10:14:52Z',
      createDate: '2024-11-27T10:14:52Z',
    },
    isSubmitting: false,
    onSubmit: fn(),
    serverError: undefined,
  },
};
