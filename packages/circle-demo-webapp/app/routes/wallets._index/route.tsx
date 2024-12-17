import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletSetDetails } from '~/components/WalletSetDetails/WalletSetDetails';
import { cachedLoader, invalidateCache } from '~/lib/cache';
import { sdk } from '~/lib/sdk';
import { WalletSet } from '~/lib/types';

import { NewWalletSetDialog } from './components/NewWalletSetDialog';

export async function loader() {
  return cachedLoader('walletSets', async () => {
    const resp = await sdk.listWalletSets();
    return resp?.data?.walletSets as WalletSet[];
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const name = String(body.get('name'));

  await sdk.createWalletSet({
    name,
  });

  invalidateCache('walletSets');

  return null;
}

function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Wallet Sets</h1>
        <p>All wallet sets</p>
      </div>
      <NewWalletSetDialog />
    </header>
  );
}

export default function Page() {
  const walletSets = useLoaderData<typeof loader>();

  if (!walletSets.length) {
    return (
      <div className="space-y-6">
        <Header />

        <h2>No wallet sets found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {walletSets.map((set) => (
          <Card key={set.id} className="p-4">
            <WalletSetDetails walletSet={set}>
              <Button variant="outline" asChild>
                <Link to={`/wallets/${set.id}`}>Show Wallets</Link>
              </Button>
            </WalletSetDetails>
          </Card>
        ))}
      </div>
    </div>
  );
}
