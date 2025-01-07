import { GetTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export const action: ActionFunction = async ({ request }) => {
  const res = await sdk.getTransaction((await request.json()) as GetTransactionInput);
  return Response.json(res.data);
};
