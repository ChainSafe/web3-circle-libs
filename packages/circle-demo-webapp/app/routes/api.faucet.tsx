import { ActionFunctionArgs } from '@remix-run/node';

import { TestnetBlockchain } from '~/lib/constants';
import { sdk } from '~/lib/sdk';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const blockchain = String(formData.get('blockchain')) as TestnetBlockchain;
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const address = String(formData.get('address'));

  console.log('action faucet', blockchain, address);

  if (!blockchain || !address) {
    return null;
  }

  await sdk.requestTestnetTokens({
    // @ts-expect-error blockchain type fix
    blockchain,
    address,
    native: true,
    usdc: true,
  });

  return null;
}
