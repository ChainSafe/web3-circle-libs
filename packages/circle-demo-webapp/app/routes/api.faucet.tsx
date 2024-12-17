import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';
import { TypeTestnetBlockchain } from '~/lib/types';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const blockchain = String(formData.get('blockchain')) as TypeTestnetBlockchain;
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const address = String(formData.get('address'));

  console.log('action faucet', blockchain, address);

  if (!blockchain || !address) {
    return null;
  }

  await sdk.requestTestnetTokens({
    blockchain,
    address,
    native: true,
    usdc: true,
  });

  return null;
}
