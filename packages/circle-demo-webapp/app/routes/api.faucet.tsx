import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { TypeTestnetBlockchain } from '~/lib/types';
import { isValidString } from '~/lib/utils';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const blockchain = formData.get('blockchain');
  const address = formData.get('address');

  if (!isValidString(blockchain) || !isValidString(address)) {
    throw new Error('Invalid blockchain or address');
  }

  await sdk.requestTestnetTokens({
    blockchain: blockchain as TypeTestnetBlockchain,
    address,
    native: true,
    usdc: true,
  });

  return null;
}
