import { ListTransactionsInput } from '@circle-fin/developer-controlled-wallets';
import { ElementsTransactionWithToken } from '@circle-libs/react-elements';
import { LoaderFunctionArgs } from '@remix-run/node';

import { cachedCoins } from '~/lib/memcache';
import { sdk } from '~/lib/sdk';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const params: ListTransactionsInput = Object.fromEntries(
    new URLSearchParams(url.searchParams),
  );
  const filter = {
    ...params,
    walletIds: params.walletIds
      ? Array.isArray(params.walletIds)
        ? params.walletIds
        : [params.walletIds]
      : undefined,
  };

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
  const txWithTokens: ElementsTransactionWithToken[] = [];

  for (const tx of txs) {
    const cachedToken = tx.tokenId ? cachedCoins.get(tx.tokenId) : undefined;
    if (cachedToken) {
      txWithTokens.push({ ...tx, token: cachedToken } as ElementsTransactionWithToken);
    } else {
      txWithTokens.push(tx as ElementsTransactionWithToken);
    }
  }

  return Response.json({ transactions: txWithTokens });
}
