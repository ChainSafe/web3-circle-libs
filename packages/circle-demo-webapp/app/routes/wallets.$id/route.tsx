import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';

import { NewWalletDialog } from './components/NewWalletDialog';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet Set ID is required');
  }

  return sdk.wallet.list({ walletSetId: id });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const name = String(body.get('name'));
  const walletSetId = String(body.get('walletSetId'));
  const blockchain = String(body.get('blockchain'));

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

export default function Page() {
  const { id } = useParams();
  const wallets = useLoaderData<typeof loader>();

  if (!id) {
    return null;
  }

  if (!wallets.length) {
    return (
      <div className="space-y-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Wallet Set {id}</h1>
          </div>
        </header>

        <h2>No wallets found</h2>
        <NewWalletDialog walletSetId={id} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet Set</h1>
          <p>{id}</p>
        </div>
        <NewWalletDialog walletSetId={id} />
      </header>

      <div className="flex flex-wrap items-center gap-6">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="flex-1 min-w-[360px]">
            <WalletDetails wallet={wallet}>
              <Button variant="outline" asChild>
                <Link to={`/wallet/${wallet.id}`}>Show wallet page</Link>
              </Button>
            </WalletDetails>
          </div>
        ))}
      </div>
    </div>
  );
}
