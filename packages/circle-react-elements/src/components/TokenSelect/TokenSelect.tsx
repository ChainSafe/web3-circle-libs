import { Balance } from '@circle-fin/developer-controlled-wallets';
import { SelectProps } from '@radix-ui/react-select';

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
   * Array of Balance objects returned from Circle's API
   */
  balances: Balance[];

  /**
   * Optional form field error. When true, adds a red border to indicate validation errors
   */
  isError?: boolean;

  /**
   * Optional default token ID to pre-select in the dropdown
   */
  defaultValue?: string;
};

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
  isError,
  defaultValue,
  ...other
}: TokenSelectProps) {
  return (
    <Select defaultValue={defaultValue} {...other}>
      <SelectTrigger className={cn('w-full', isError ? 'border border-destructive' : '')}>
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
