import { CreateTransferTransactionInput } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { assertCircleErrorResponse, errorResponse } from '~/lib/server.responses';

export const action: ActionFunction = async ({ request }) => {
  try {
    const res = await sdk.createTransaction(
      (await request.json()) as CreateTransferTransactionInput,
    );
    return Response.json(res.data);
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(e.response.data.error.message);
  }
};
