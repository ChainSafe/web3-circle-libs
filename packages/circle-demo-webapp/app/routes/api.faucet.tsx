import { ActionFunctionArgs } from '@remix-run/node';
import type { BLOCKCHAIN } from 'web3-circle-sdk';

import { sdk } from '~/lib/sdk';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const blockchain = String(formData.get('blockchain')) as BLOCKCHAIN;
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
