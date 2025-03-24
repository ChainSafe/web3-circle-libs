import { ElementsTransactionWithToken } from '@chainsafe/circle-react-elements';
import {
  GetTransactionInput,
  TransactionType,
} from '@circle-fin/developer-controlled-wallets';
import { LoaderFunctionArgs } from '@remix-run/node';

import { cachedCoins } from '~/lib/memcache';
import { sdk } from '~/lib/sdk';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const params: GetTransactionInput = {
    id: url.searchParams.get('id')!,
  };
  const txType = url.searchParams.get('txType');
  if (txType) {
    params.txType = txType as TransactionType;
  }

  const res = await sdk.getTransaction(params);
  if (res?.data?.transaction?.tokenId) {
    (res.data.transaction as ElementsTransactionWithToken).token =
      await cachedCoins.loadAndSet(res.data.transaction?.tokenId);
  }

  return Response.json(res.data);
}
