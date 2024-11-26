import { WalletSet } from '../../../packages/web3-circle-sdk';
import { sdk } from './_sdk';

const sets: WalletSet[] = await sdk.walletSet.list();

console.log(sets);
