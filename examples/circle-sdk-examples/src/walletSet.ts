import { WalletSet } from 'web3-plugin-circle';
import { sdk } from './_sdk';

const sets: WalletSet[] = await sdk.walletSet.list();

console.log(sets);
