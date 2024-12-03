import { ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { sdk } from '~/lib/sdk';

import { NewWalletSetDialog } from './components/NewWalletSetDialog';
import { WalletSetsCard } from './components/WalletSetsCard';

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
          </div>
        </header>

        <h2>No wallet set found</h2>
        <NewWalletSetDialog />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Wallet Sets</h1>
        </div>
      </header>

      <WalletSetsCard walletSets={walletSets} />
    </div>
  );
}
