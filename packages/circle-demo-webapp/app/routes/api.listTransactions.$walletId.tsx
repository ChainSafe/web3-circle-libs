import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import { LoaderFunctionArgs } from '@remix-run/node';

import { cachedCoins } from '~/lib/memcache';
import { sdk } from '~/lib/sdk';
import { TransactionWithToken } from '~/lib/types';

export async function loader(o: LoaderFunctionArgs) {
  const url = new URL(o.request.url);
  const params = o.params;
  if (!params.walletId) {
    throw new Error('Wallet ID is required');
  }
  const filter: ListTransactionsInput = {
    walletIds: [params.walletId],
    includeAll: true,
    pageSize: 10,
  };
  if (url.searchParams.has('address')) {
    filter.destinationAddress = String(url.searchParams.get('address'));
  }
  const res = await sdk.listTransactions(filter);
  const txs = res.data?.transactions ?? [];
  const needToLoad: Record<string, boolean> = {};
  const prs = [];
  for (const tx of txs) {
    if (tx.tokenId && !needToLoad[String(tx.tokenId)] && !cachedCoins.has(tx.tokenId)) {
      needToLoad[tx.tokenId] = true;
      prs.push(cachedCoins.loadAndSet(tx.tokenId));
    }
  }

  if (prs.length > 0) {
    await Promise.all(prs);
  }
  const txWithTokens: TransactionWithToken[] = [];

  for (const tx of txs) {
    const cachedToken = tx.tokenId ? cachedCoins.get(tx.tokenId) : undefined;
    if (cachedToken) {
      txWithTokens.push({ ...tx, token: cachedToken } as TransactionWithToken);
    } else {
      txWithTokens.push(tx as TransactionWithToken);
    }
  }

  return Response.json(txWithTokens);
}
