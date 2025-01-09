import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { ErrorResponseObject, TypeTestnetBlockchain } from '~/lib/types';
import { isValidString } from '~/lib/utils';

interface RequestBody {
  blockchain: string;
  address: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const { blockchain, address } = (await request.json()) as RequestBody;

  if (!isValidString(blockchain)) {
    return Response.json({ error: 'Invalid blockchain' });
  }

  if (!isValidString(address)) {
    return Response.json({ error: 'Invalid address' });
  }

  try {
    await sdk.requestTestnetTokens({
      blockchain: blockchain as TypeTestnetBlockchain,
      address,
      native: true,
      usdc: true,
    });
    return Response.json({ message: 'Success' });
  } catch (e: unknown) {
    return Response.json({ error: (e as ErrorResponseObject)?.response?.data });
  }
}
