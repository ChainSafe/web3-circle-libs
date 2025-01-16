import { LoaderCircle, Plus } from 'lucide-react';
import { FormEvent } from 'react';

import { Button } from '~/components/ui/button';
import { useFaucet } from '~/hooks/useFaucet';
import { Wallet } from '~/lib/types';

interface FaucetButtonProps {
  wallet: Wallet;
}

export function FaucetButton({ wallet }: FaucetButtonProps) {
  const { requestFaucet, isLoading } = useFaucet();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const blockchain = formData.get('blockchain') as string;
    const address = formData.get('address') as string;

    void requestFaucet({ blockchain, address });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="address" value={wallet.address} />
      <input type="hidden" name="blockchain" value={wallet.blockchain} />
      <Button type="submit" variant="default" disabled={isLoading}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <Plus />}
        Use Faucet
      </Button>
    </form>
  );
}
