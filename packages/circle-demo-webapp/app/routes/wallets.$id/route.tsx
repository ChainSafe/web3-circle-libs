import { ActionFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { WalletDetails } from '~/components/WalletDetails';
import { sdk } from '~/lib/sdk';
import { TypeBlockchain, Wallet, WalletSet } from '~/lib/types';

import { NewWalletDialog } from './components/NewWalletDialog';

export async function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    throw new Error('Wallet Set ID is required');
  }

  const [walletsResp, walletSetResp] = await Promise.all([
    sdk.listWallets({ walletSetId: id }),
    sdk.getWalletSet({ id }),
  ]);

  return {
    wallets: walletsResp?.data?.wallets as Wallet,
    walletSet: walletSetResp?.data?.walletSet as WalletSet,
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const name = String(body.get('name'));
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const walletSetId = String(body.get('walletSetId'));
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const blockchain = String(body.get('blockchain')) as TypeBlockchain;

  await sdk.createWallets({
    walletSetId,
    count: 1, // @todo: allow user to specify count
    blockchains: [blockchain],
    metadata: [
      {
        name,
      },
    ],
  });

  return null;
}

function Header({ walletSet }: { walletSet }) {
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

  if (!wallets?.length) {
    return (
      <div className="space-y-6">
        <Header walletSet={walletSet as WalletSet} />

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
              <WalletDetails wallet={wallet as Wallet}>
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
