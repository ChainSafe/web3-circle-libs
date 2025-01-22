import { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';

import { assertCircleErrorResponse, errorResponse } from '~/lib/server.responses';

const apiKey = process.env.CIRCLE_API_KEY!;
const url = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';

interface RequestBody {
  address: string;
  blockchain: Blockchain;
}

export interface ScreenAddressResult {
  data: {
    result: boolean;
  };
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  const { address, blockchain } = (await request.json()) as RequestBody;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        address,
        chain: blockchain,
        idempotencyKey: crypto.randomUUID(),
      }),
    });

    const result = (await response.json()) as ScreenAddressResult;

    return Response.json(result.data);
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(e.response.data.message);
  }
};
