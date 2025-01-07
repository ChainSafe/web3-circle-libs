import { CreateTransferTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { ErrorResponseObject } from '~/lib/types';

export const action: ActionFunction = async ({ request }) => {
  try {
    const res = await sdk.createTransaction(
      (await request.json()) as CreateTransferTransactionInput,
    );
    return Response.json(res.data);
  } catch (e: unknown) {
    return Response.json({ error: (e as ErrorResponseObject)?.response?.data });
  }
};
