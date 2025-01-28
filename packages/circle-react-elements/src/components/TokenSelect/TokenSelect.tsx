import { Balance } from '@circle-fin/developer-controlled-wallets';
import { SelectProps } from '@radix-ui/react-select';
import { useMemo } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { cn } from '~/lib/utils';

import { TokenSelectItem } from './TokenSelectItem';

export type TokenSelectProps = Omit<SelectProps, 'children'> & {
  /**
   * Optional placeholder text shown when no token is selected
   * @default "Select Token"
   */
  placeholder?: string;

  /**
   * Array of Balance objects returned from Circle's API.
   */
  balances: Balance[];

  /**
   * Optional form field error from react-hook-form. When provided, adds a red border to indicate validation errors.
   */
  error?: FieldError;

  /**
   * When true, automatically selects USDC token if available in balances
   * @default false
   */
  defaultToUsdc?: boolean;
};

/**
 * Helper function to find USDC token ID in balances array
 * Used when defaultToUsdc prop is true to pre-select USDC
 */
function findTokenSelectDefaultValue(balances: Balance[]): string | undefined {
  const usdcToken = balances.find((balance) => balance.token.symbol === 'USDC');
  return usdcToken?.token.id;
}

/**
 * A dropdown select menu for choosing a token from a list of balances
 *
 * Features:
 * - Displays token icons and symbols using TokenSelectItem
 * - Shows token balances in the dropdown
 * - Optional auto-selection of USDC token
 * - Form validation integration with error states
 * - Customizable placeholder text
 * - Uses Radix UI Select for accessibility
 * - Consistent styling with design system
 */
export function TokenSelect({
  placeholder = 'Select Token',
  balances = [],
  error,
  defaultToUsdc = false,
  ...other
}: TokenSelectProps) {
  const defaultValue = useMemo(
    () => (defaultToUsdc ? findTokenSelectDefaultValue(balances) : undefined),
    [balances, defaultToUsdc],
  );

  return (
    <Select defaultValue={defaultValue} {...other}>
      <SelectTrigger className={cn('w-full', error ? 'border border-destructive' : '')}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {balances.map((balance) => (
          <SelectItem key={balance.token.id} value={balance.token.id}>
            <TokenSelectItem balance={balance} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
