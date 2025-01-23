import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { NewWalletSetForm } from './NewWalletSetForm';

const meta = {
  title: 'NewWalletSetForm',
  component: NewWalletSetForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewWalletSetForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSubmitting: false,
    onSubmit: fn(),
    serverError: undefined,
  },
};
