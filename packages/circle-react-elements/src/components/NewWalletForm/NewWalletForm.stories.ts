import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { NewWalletForm } from './NewWalletForm';

const meta = {
  title: 'Form Components/NewWalletForm',
  component: NewWalletForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewWalletForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    walletSetId: 'f270e785-0a7b-578d-a43c-bd514fcc4d49',
    isSubmitting: false,
    onSubmit: fn(),
    serverError: undefined,
  },
};
