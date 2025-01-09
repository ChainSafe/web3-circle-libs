import { SelectProps } from '@radix-ui/react-select';

import { TokenSelectItem } from '~/components/TokenSelect/TokenSelectItem';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { WalletTokenBalance } from '~/lib/types';

export type TokenSelectProps = Omit<SelectProps, 'children'> & {
  placeholder?: string;
  balances: WalletTokenBalance[];
  className?: string;
};

/** A dropdown select menu to choose a token */
export function TokenSelect({ className, ...props }: TokenSelectProps) {
  const { placeholder = 'Select Token', balances = [], ...other } = props;
  return (
    <Select {...other}>
      <SelectTrigger className={`w-full ${className}`}>
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
