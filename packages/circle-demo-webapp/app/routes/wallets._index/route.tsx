import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletSetDetails } from '~/components/WalletSetDetails/WalletSetDetails';
import { sdk } from '~/lib/sdk';

import { NewWalletSetDialog } from './components/NewWalletSetDialog';

export async function loader() {
  return sdk.walletSet.list();
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get('name'));

  await sdk.walletSet.create({
    name,
  });

  return null;
}

export default function Page() {
  const walletSets = useLoaderData<typeof loader>();

  if (!walletSets.length) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Wallet Sets</h1>
            <p>All wallet sets</p>
          </div>
          <NewWalletSetDialog />
        </header>

        <h2>No wallet sets found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet Sets</h1>
          <p>All wallet sets</p>
        </div>
        <NewWalletSetDialog />
      </header>

      <div className="flex flex-wrap items-center gap-6">
        {walletSets.map((set) => (
          <div key={set.id} className="flex-1 min-w-[360px]">
            <Card className="p-4">
              <WalletSetDetails walletSet={set}>
                <Button variant="outline" asChild>
                  <Link to={`/wallets/${set.id}`}>Show Wallets</Link>
                </Button>
              </WalletSetDetails>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
