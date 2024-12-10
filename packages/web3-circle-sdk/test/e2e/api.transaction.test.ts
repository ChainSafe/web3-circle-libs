import { v4 } from 'uuid';

import { BLOCKCHAIN, FEE_LEVEL, TRANSACTION_STATE, TransactionApi } from '../../src';

import {
  ETH_SEPOLIA_BASIC_CONTRACT_ADDRESS,
  ETH_SEPOLIA_WALLET_ID,
  waitTxState,
} from './fixtures/fixtures';

const apikey = process.env.API_KEY as string;
const secret = process.env.SECRET as string;

jest.setTimeout(30000);
describe('TransactionApi Tests', () => {
  const transactionApi = new TransactionApi(apikey, secret);

  it('List Transactions', async () => {
    const res = await transactionApi.list();
    expect(res).toBeDefined();
    expect(res.length).toBeGreaterThan(0);
    const transaction = res[0];
    expect(transaction.id).toBeDefined();
    expect(transaction.blockchain).toBeDefined();
    expect(transaction.createDate).toBeDefined();
    expect(transaction.updateDate).toBeDefined();
  });

  it('Validate Address', async () => {
    const isValid = await transactionApi.validateAddress({
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      address: '0x6bc50ff08414717f000431558c0b585332c2a53d',
    });
    expect(isValid).toBeDefined();
    expect(typeof isValid).toBe('boolean');
  });

  it('Estimate Contract Execution Fee', async () => {
    const feeEstimate = await transactionApi.estimateContractExecutionFee({
      contractAddress: '0x6bc50ff08414717f000431558c0b585332c2a53d',
      abiFunctionSignature: 'burn(uint256)',
      abiParameters: ['100'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      sourceAddress: '0x1bf9ad0cc2ad298c69a2995aa806ee832788218c',
    });
    expect(feeEstimate).toBeDefined();
    expect(feeEstimate.low).toBeDefined();
    expect(feeEstimate.medium).toBeDefined();
    expect(feeEstimate.high).toBeDefined();
    expect(feeEstimate.low.gasLimit).toBeDefined();
    expect(feeEstimate.low.baseFee).toBeDefined();
    expect(feeEstimate.low.priorityFee).toBeDefined();
    expect(feeEstimate.low.maxFee).toBeDefined();
    expect(feeEstimate.medium.gasLimit).toBeDefined();
    expect(feeEstimate.medium.baseFee).toBeDefined();
    expect(feeEstimate.medium.priorityFee).toBeDefined();
    expect(feeEstimate.medium.maxFee).toBeDefined();
    expect(feeEstimate.high.gasLimit).toBeDefined();
    expect(feeEstimate.high.baseFee).toBeDefined();
    expect(feeEstimate.high.priorityFee).toBeDefined();
    expect(feeEstimate.high.maxFee).toBeDefined();
  });

  it('Get a Transaction', async () => {
    const id = '973e1dcf-f0a2-50a3-b55a-d6b061ed593d';
    const transaction = await transactionApi.get({ id });
    expect(transaction).toBeDefined();
    expect(transaction.id).toBe(id);
    expect(transaction.blockchain).toBe(BLOCKCHAIN.ETH_SEPOLIA);
    expect(transaction.tokenId).toBe('979869da-9115-5f7d-917d-12d434e56ae7');
    expect(transaction.walletId).toBe('c6243ec1-0e98-5deb-885d-fe1de7f16edc');
    expect(transaction.sourceAddress).toBe('0x81d3ce1a567389f6cb1178a68eb33aa6f081dc52');
    expect(transaction.destinationAddress).toBe(
      '0x16dba1b356bed03159e5074836169b487b845ecd',
    );
    expect(transaction.transactionType).toBe('INBOUND');
    expect(transaction.custodyType).toBe('DEVELOPER');
    expect(transaction.state).toBe('COMPLETE');
    expect(transaction.transactionScreeningEvaluation).toBeDefined();
    expect(transaction.amounts).toEqual(['0.2']);
    expect(transaction.nfts).toBeNull();
    expect(transaction.txHash).toBe(
      '0x2da6f0576d56cbd190b8eacaf45927e66bfa5e08c9c7f9341d441eb73bb858e7',
    );
    expect(transaction.blockHash).toBe(
      '0x9f93b735ed48f2a940dda789168280d4bc99ceb2f73a77715b61a71bf11cf7fa',
    );
    expect(transaction.blockHeight).toBe(7153240);
    expect(transaction.networkFee).toBe('0.00003471065304');
    expect(transaction.firstConfirmDate).toBeDefined();
    expect(transaction.operation).toBe('TRANSFER');
    expect(transaction.abiParameters).toBeNull();
    expect(transaction.createDate).toBeDefined();
    expect(transaction.updateDate).toBeDefined();
  });

  it('Create Transfer Transaction', async () => {
    const res = await transactionApi.createTransfer({
      walletId: ETH_SEPOLIA_WALLET_ID,
      destinationAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
      amounts: ['0.000001'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      feeLevel: FEE_LEVEL.MEDIUM,
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBe('INITIATED');
  });

  it('Estimate Transfer Fee', async () => {
    const feeEstimate = await transactionApi.estimateTransferFee({
      walletId: ETH_SEPOLIA_WALLET_ID,
      destinationAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
      amounts: ['0.000001'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
    });
    expect(feeEstimate).toBeDefined();
    expect(feeEstimate.low).toBeDefined();
    expect(feeEstimate.medium).toBeDefined();
    expect(feeEstimate.high).toBeDefined();
    expect(feeEstimate.low.gasLimit).toBeDefined();
    expect(feeEstimate.low.baseFee).toBeDefined();
    expect(feeEstimate.low.priorityFee).toBeDefined();
    expect(feeEstimate.low.maxFee).toBeDefined();
    expect(feeEstimate.medium.gasLimit).toBeDefined();
    expect(feeEstimate.medium.baseFee).toBeDefined();
    expect(feeEstimate.medium.priorityFee).toBeDefined();
    expect(feeEstimate.medium.maxFee).toBeDefined();
    expect(feeEstimate.high.gasLimit).toBeDefined();
    expect(feeEstimate.high.baseFee).toBeDefined();
    expect(feeEstimate.high.priorityFee).toBeDefined();
    expect(feeEstimate.high.maxFee).toBeDefined();
  });

  it('Create Contract Execution Transaction', async () => {
    const res = await transactionApi.createContractExecutionTransaction({
      walletId: ETH_SEPOLIA_WALLET_ID,
      contractAddress: ETH_SEPOLIA_BASIC_CONTRACT_ADDRESS,
      abiFunctionSignature: 'setValues(uint256, string, bool)',
      abiParameters: ['1', 'str', true],
      feeLevel: FEE_LEVEL.MEDIUM,
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBeDefined();
  });

  it('Cancel Transaction', async () => {
    const res = await transactionApi.createTransfer({
      walletId: ETH_SEPOLIA_WALLET_ID,
      destinationAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
      amounts: ['0.000001'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      feeLevel: FEE_LEVEL.MEDIUM,
      idempotencyKey: v4(),
    });
    const canceled = await transactionApi.cancel({
      id: res.id,
    });
    expect(res).toBeDefined();
    expect(res.id).toBeDefined();
    expect(res.state).toBe('INITIATED');
    expect(res.id).toBe(canceled.id);
    expect(canceled.state).toBe('');
  });

  it('Accelerate Transaction', async () => {
    const fee = await transactionApi.estimateTransferFee({
      walletId: ETH_SEPOLIA_WALLET_ID,
      destinationAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
      amounts: ['0.000001'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
    });
    const tx = await transactionApi.createTransfer({
      walletId: ETH_SEPOLIA_WALLET_ID,
      destinationAddress: '0x81d3Ce1A567389F6cB1178A68EB33Aa6f081Dc52',
      amounts: ['0.000001'],
      blockchain: BLOCKCHAIN.ETH_SEPOLIA,
      gasLimit: fee.medium.gasLimit,
      maxFee: fee.medium.maxFee,
      priorityFee: fee.medium.priorityFee,
      idempotencyKey: v4(),
    });
    // wait for sent status. Accelerating a transaction can only occur when a transaction is in the SENT state.
    await waitTxState(transactionApi, tx.id, TRANSACTION_STATE.SENT);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await transactionApi.accelerate({ id: tx.id });
    await waitTxState(transactionApi, tx.id, [
      TRANSACTION_STATE.ACCELERATED,
      TRANSACTION_STATE.CONFIRMED,
    ]);
    expect(res).toBeDefined();
    expect(res.id).toBe(tx.id);
    expect(res.state).toBeDefined();
  });
});
