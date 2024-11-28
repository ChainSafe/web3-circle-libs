import { useLoaderData } from '@remix-run/react';
import { sdk } from '../sdk';

export async function loader() {
  return sdk.walletSet.list();
}

export default function WalletOverview() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        {data.map((walletSet) => (
          <div key={walletSet.id}>
            <p>{walletSet.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
