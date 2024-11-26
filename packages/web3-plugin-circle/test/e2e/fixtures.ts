import { TransactionApi } from '../../src/sdk/TransactionApi';

export const ETH_SEPOLIA_WALLET_ID = 'c6243ec1-0e98-5deb-885d-fe1de7f16edc';
export const ETH_SEPOLIA_WALLET_ADDRESS = '0x16dba1b356bed03159e5074836169b487b845ecd';
export const EVM_TESTNET_WALLET_ID = '9b6c29be-fb99-51e5-aa02-7cb75ca34d4b';
export const ETH_SEPOLIA_EURC_TOKEN_ID = 'c22b378a-843a-59b6-aaf5-bcba622729e6';
export const ETH_SEPOLIA_BASIC_CONTRACT_ADDRESS =
  '0xff6a1eae1c9b07f5f0f98d45c033e3a9eefdce48';
export const ETH_SEPOLIA_USDC_CONTRACT_ADDRESS =
  '0xf08a50178dfcde18524640ea6618a1f965821715';
export const waitTxState = async (
  transactionApi: TransactionApi,
  txId: string,
  state: string | string[],
): Promise<void> =>
  new Promise((resolve) => {
    const waitState = Array.isArray(state) ? state : [state];
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      const res = await transactionApi.get({ id: txId });
      if (waitState.includes(res.state)) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
