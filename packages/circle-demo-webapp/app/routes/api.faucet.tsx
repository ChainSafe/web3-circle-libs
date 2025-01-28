import { TestnetBlockchain } from '@circle-fin/developer-controlled-wallets';
import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import {
  assertCircleErrorResponse,
  errorResponse,
  successResponse,
} from '~/lib/server.responses';
import { isValidString } from '~/lib/utils';

interface RequestBody {
  blockchain: TestnetBlockchain;
  address: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { blockchain, address } = (await request.json()) as RequestBody;

  if (!isValidString(blockchain)) {
    return errorResponse('Invalid blockchain');
  }

  if (!isValidString(address)) {
    return errorResponse('Invalid address');
  }

  try {
    await sdk.requestTestnetTokens({
      blockchain: blockchain,
      address,
      native: true,
      usdc: true,
    });
    return successResponse('Success');
  } catch (e: unknown) {
    assertCircleErrorResponse(e);

    return errorResponse(e.response.data.message);
  }
}
