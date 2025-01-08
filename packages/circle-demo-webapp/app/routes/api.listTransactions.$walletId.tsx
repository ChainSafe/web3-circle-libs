import { LoaderFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.walletId) {
    throw new Error('Wallet ID is required');
  }

  const res = await sdk.listTransactions({
    walletIds: [params.walletId],
    includeAll: true,
  });

  return Response.json(res.data?.transactions);
}
