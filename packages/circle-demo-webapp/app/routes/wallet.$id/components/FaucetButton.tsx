import { useFetcher } from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';
import type { Wallet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';

interface FaucetButtonProps {
  wallet: Wallet;
}

export function FaucetButton({ wallet }: FaucetButtonProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" action="/api/faucet">
      <input type="hidden" name="address" value={wallet.address} />
      <input type="hidden" name="blockchain" value={wallet.blockchain} />
      <Button type="submit" variant="outline">
        {fetcher.state === 'submitting' && <LoaderCircle />}
        Use Faucet
      </Button>
    </fetcher.Form>
  );
}
