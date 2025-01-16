import { Link, useLoaderData, useRevalidator } from '@remix-run/react';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletSetDetails } from '~/components/WalletSetDetails/WalletSetDetails';
import { cachedLoader } from '~/lib/cache';
import { sdk } from '~/lib/sdk';
import { WalletSet } from '~/lib/types';

import { NewWalletSetDialog } from './components/NewWalletSetDialog';

export async function loader() {
  return cachedLoader('walletSets', async () => {
    const resp = await sdk.listWalletSets();
    return resp?.data?.walletSets as WalletSet[];
  });
}

function Header() {
  const revalidator = useRevalidator();

  const revalidate = () => {
    revalidator.revalidate();
  };

  return (
    <header className="flex justify-between items-center bg-background px-8 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Wallet Sets</h1>
      </div>
      <NewWalletSetDialog onSuccess={revalidate} />
    </header>
  );
}

export default function Page() {
  const walletSets = useLoaderData<typeof loader>();

  if (!walletSets.length) {
    return (
      <div>
        <Header />

        <div className="p-8">
          <h2>No wallet sets found</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {walletSets.map((set) => (
            <Card key={set.id} className="p-4">
              <WalletSetDetails walletSet={set}>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/wallets/${set.id}`}>
                    Show Wallets <ArrowUpRight />
                  </Link>
                </Button>
              </WalletSetDetails>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
