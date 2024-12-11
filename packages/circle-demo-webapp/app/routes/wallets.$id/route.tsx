import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import type { BLOCKCHAIN, WalletSet } from 'web3-circle-sdk';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';

import { NewWalletDialog } from './components/NewWalletDialog';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet Set ID is required');
  }

  const [wallets, walletSet] = await Promise.all([
    sdk.wallet.list({ walletSetId: id }),
    sdk.walletSet.get(id),
  ]);

  return {
    wallets,
    walletSet,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get('name'));
  const walletSetId = String(body.get('walletSetId'));
  const blockchain = String(body.get('blockchain')) as BLOCKCHAIN;

  await sdk.wallet.create({
    walletSetId,
    blockchains: [blockchain],
    metadata: [
      {
        name,
      },
    ],
  });

  return null;
}

function Header({ walletSet }: { walletSet: WalletSet }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Wallet Set</h1>
        <p>Name: {walletSet.name}</p>
        <p>ID: {walletSet.id}</p>
      </div>
      <NewWalletDialog walletSetId={walletSet.id} />
    </header>
  );
}

export default function Page() {
  const { id } = useParams();
  const { wallets, walletSet } = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  if (!wallets.length) {
    return (
      <div className="space-y-6">
        <Header walletSet={walletSet} />

        <h2>No wallets found</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header walletSet={walletSet} />

      <div className="flex flex-wrap items-center gap-6">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="flex-1 min-w-[360px]">
            <Card className="p-4">
              <WalletDetails wallet={wallet}>
                <Button variant="outline" asChild>
                  <Link to={`/wallet/${wallet.id}`}>Wallet Details</Link>
                </Button>
              </WalletDetails>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
