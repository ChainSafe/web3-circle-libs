import { ActionFunctionArgs } from '@remix-run/node';

import { sdk } from '~/lib/sdk';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const blockchain = String(formData.get('blockchain'));
  const address = String(formData.get('address'));

  console.log('action faucet', blockchain, address);

  if (!blockchain || !address) {
    return null;
  }

  await sdk.faucet.request({
    blockchain,
    address,
    native: true,
    usdc: true,
  });

  return null;
}
