/**
 * Request types
 */

export type FilterPagesOptions = {
  pageBefore?: string;
  pageAfter?: string;
  pageSize?: number;
};
export type FilterOptions = {
  from?: string;
  to?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet
 */
export type WalletCreateParameters = {
  walletSetId: string;
  blockchains: string[];
  idempotencyKey: string;
  accountType?: string;
  count?: number;
  metadata?: { [key: string]: any }[];
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets
 */
export type WalletListParameters = {
  address?: string;
  blockchain?: string;
  walletSetId?: string;
  refId?: string;
} & FilterOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet
 */
export type WalletUpdateParameters = {
  id: string;
  name?: string;
  refId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance
 */
export type WalletBalanceParameters = {
  id: string;
  includeAll?: boolean;
  name?: string;
  tokenAddress?: string;
  standard?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts
 */
export type WalletNftsParameters = {
  id: string;
  includeAll?: boolean;
  name?: string;
  tokenAddress?: string;
  standard?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets
 */
export type WalletSetListParameters = FilterOptions;

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set
 */
export type WalletSetCreateParameters = {
  idempotencyKey?: string;
  name?: string;
};
export type DeveloperFields = {
  entitySecretCiphertext: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set
 */
export type WalletSetUpdateParameters = {
  id: string;
  name: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-message
 */
export type SignMessageParameters = {
  message: string;
  walletId: string;
  encodedByHex?: boolean;
  memo?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-typedData
 */
export type SignTypedDataParameters = {
  data: string;
  walletId: string;
  memo?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction
 */
export type SignTransactionParameters = {
  walletId: string;
  rawTransaction?: string;
  transaction?: string;
  memo?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-delegateAction
 */
export type SignDelegateActionParameters = {
  unsignedDelegateAction: string;
  walletId: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/transactions/list-transactions
 */
export type ListTransactionsParameters = {
  blockchain?: string;
  custodyType?: string;
  destinationAddress?: string;
  includeAll?: boolean;
  operation?: string;
  state?: string;
  txHash?: string;
  txType?: string;
  walletIds?: string;
} & FilterOptions;

/**
 * https://developers.circle.com/api-reference/w3s/transactions/get-transaction
 */
export type GetTransactionParameters = {
  id: string;
  txType?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/transactions/create-transfer
 */
export type CreateTransferTransactionParameters = {
  walletId: string;
  entitySecretCiphertext: string;
  destinationAddress: string;
  idempotencyKey: string;
  amounts: string[];
  feeLevel?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFee?: string;
  priorityFee?: string;
  nftTokenIds?: string[];
  refId?: string;
  tokenId?: string;
  tokenAddress?: string;
  blockchain?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/templates/estimateFee
 */
export type EstimateContractDeploymentFeeParameters = {
  id: string;
  blockchain: string;
  sourceAddress?: string;
  templateParameters?: { [key: string]: any };
  walletId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/templates/deploy
 */
export type DeployContractTemplateParameters = {
  id: string;
  entitySecretCiphertext: string;
  name: string;
  walletId: string;
  blockchain: string;
  idempotencyKey: string;
  description?: string;
  templateParameters?: { [key: string]: any };
  feeLevel?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFee?: string;
  priorityFee?: string;
  refId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/contracts/list-contracts
 */
export type ListContractsParameters = {
  blockchain?: string;
  contractInputType?: string;
  deployerAddress?: string;
  name?: string;
  status?: string;
  from?: string;
  to?: string;
} & FilterPagesOptions;

/**
 * https://developers.circle.com/api-reference/w3s/contracts/update-contract
 */
export type UpdateContractParameters = {
  id: string;
  name?: string;
  description?: string;
  archived?: boolean;
};

/**
 * https://developers.circle.com/api-reference/w3s/contracts/import-contract
 */
export type ImportContractParameters = {
  blockchain: string;
  address: string;
  name: string;
  idempotencyKey: string;
  description?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/contracts/deploy/estimateFee
 */
export type EstimateContractDeploymentParameters = {
  bytecode: string;
  abiJson?: string;
  blockchain: string;
  constructorSignature?: string;
  constructorParameters?: (string | number | boolean)[];
  sourceAddress?: string;
  walletId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/contracts/deploy
 */
export type DeployContractParameters = {
  blockchain: string;
  entitySecretCiphertext: string;
  bytecode: string;
  abiJson: string;
  walletId: string;
  name: string;
  idempotencyKey: string;
  description?: string;
  constructorParameters?: (string | number | boolean)[];
  feeLevel?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFee?: string;
  priorityFee?: string;
  refId?: string;
};

/**
 * https://developers.circle.com/api-reference/w3s/contracts/query
 */
export type QueryContractParameters = {
  blockchain: string;
  address: string;
  abiFunctionSignature?: string;
  abiParameters?: (string | number | boolean | any[])[];
  abiJson?: string;
  callData?: string;
  fromAddress?: string;
};

export type GetEventMonitorsParameters = {
  contractAddress?: string;
  blockchain?: string;
  eventSignature?: string;
  from?: string;
  to?: string;
} & FilterPagesOptions;

export type CreateEventMonitorParameters = {
  idempotencyKey: string;
  eventSignature: string;
  contractAddress: string;
  blockchain: string;
};

export type UpdateEventMonitorParameters = {
  id: string;
  isEnabled: boolean;
};

export type DeleteEventMonitorParameters = {
  id: string;
};

export type GetEventLogsParameters = {
  contractAddress?: string;
  blockchain?: string;
  from?: string;
  to?: string;
} & FilterPagesOptions;

export type ValidateAddressParameters = {
  blockchain: string;
  address: string;
};

export type EstimateContractExecutionFeeParameters = {
  contractAddress: string;
  abiFunctionSignature?: string;
  abiParameters?: (string | number | boolean | any[])[];
  callData?: string;
  amount?: string;
  blockchain: string;
  sourceAddress?: string;
  walletId?: string;
};

export type EstimateTransferFeeParameters = {
  destinationAddress: string;
  amounts: string[];
  nftTokenIds?: string[];
  sourceAddress?: string;
  tokenId?: string;
  tokenAddress?: string;
  blockchain: string;
  walletId?: string;
};

export type CreateContractExecutionTransactionParameters = {
  walletId: string;
  entitySecretCiphertext: string;
  contractAddress: string;
  idempotencyKey: string;
  abiFunctionSignature?: string;
  abiParameters?: (string | number | boolean | any[])[];
  callData?: string;
  amount?: string;
  feeLevel?: string;
  gasLimit?: string;
  gasPrice?: string;
  maxFee?: string;
  priorityFee?: string;
  refId?: string;
};

export type CancelTransactionParameters = {
  id: string;
  entitySecretCiphertext: string;
  idempotencyKey: string;
};

export type AccelerateTransactionParameters = {
  id: string;
  entitySecretCiphertext: string;
  idempotencyKey: string;
};

/**
 * Response types
 */
export type WalletSet = {
  id: string;
  createDate: string;
  updateDate: string;
  custodyType: string;
  name?: string;
};
export type WalletTokenBalances = {
  amount: string;
  token: {
    id: string;
    name: string;
    standard: string;
    blockchain: string;
    decimals: number;
    isNative: boolean;
    symbol: string;
    tokenAddress: string;
    updateDate: string;
    createDate: string;
  };
  updateDate: string;
};

export type WalletNft = {
  amount: string;
  metadata: string;
  nftTokenId: string;
  token: {
    id: string;
    name: string;
    standard: string;
    blockchain: string;
    decimals: number;
    isNative: boolean;
    symbol: string;
    tokenAddress: string;
    updateDate: string;
    createDate: string;
  };
  updateDate: string;
};

export type Wallet = {
  id: string;
  address: string;
  blockchain: string;
  createDate: string; // You can also use Date if you prefer to parse it
  updateDate: string; // Same here
  custodyType: string; // Use specific value if it’s always this, or allow other potential types
  name: string;
  refId: string;
  state: string; // If the state can only have specific values, you can use string literals like 'LIVE' | 'INACTIVE'
  userId: string;
  walletSetId: string;
  initialPublicKey: string;
  accountType: string; // Use string literal if there are multiple fixed types
};

export type SignedTransaction = {
  signature: string;
  signedTransaction: string;
  txHash: string;
};

export type SignedTransactionDelegate = SignedTransaction & {
  signedDelegateAction?: string;
};

export type Transaction = {
  id: string;
  abiFunctionSignature?: string;
  abiParameters?: (string | number)[];
  amounts?: string[];
  amountInUSD?: string;
  blockHash?: string;
  blockHeight?: number;
  blockchain: string;
  contractAddress?: string;
  createDate: string;
  custodyType: string;
  destinationAddress?: string;
  errorReason?: string;
  errorDetails?: string;
  estimatedFee?: {
    gasLimit?: string;
    gasPrice?: string;
    maxFee?: string;
    priorityFee?: string;
    baseFee?: string;
    networkFee?: string;
  };
  feeLevel?: string;
  firstConfirmDate?: string;
  networkFee?: string;
  networkFeeInUSD?: string;
  nfts?: string[];
  operation: string;
  refId?: string;
  sourceAddress?: string;
  state: string;
  tokenId?: string;
  transactionType: string;
  txHash?: string;
  updateDate: string;
  userId?: string;
  walletId: string;
  transactionScreeningEvaluation?: {
    ruleName?: string;
    actions?: string[];
    screeningDate?: string;
    reasons?: {
      source: string;
      sourceValue: string;
      riskScore: string;
      riskCategories: string[];
      type: string;
    }[];
  };
};

export type Transfer = {
  id: string;
  state?: string;
};
export type EstimateFee = {
  high: {
    gasLimit: string;
    gasPrice?: string;
    maxFee: string;
    priorityFee: string;
    baseFee: string;
    networkFee: string;
  };
  low: {
    gasLimit: string;
    gasPrice?: string;
    maxFee: string;
    priorityFee: string;
    baseFee: string;
    networkFee: string;
  };
  medium: {
    gasLimit: string;
    gasPrice?: string;
    maxFee: string;
    priorityFee: string;
    baseFee: string;
    networkFee: string;
  };
  callGasLimit: string;
  verificationGasLimit: string;
  preVerificationGas: string;
};

export type Token = {
  id: string;
  name: string;
  standard: string;
  blockchain: string;
  decimals: number;
  isNative: boolean;
  symbol: string;
  tokenAddress: string;
  updateDate: string;
  createDate: string;
};

export type DeployContractFromTemplate = {
  contractIds: string[];
  transactionId: string;
};
export type DeployContract = {
  contractId: string;
  transactionId: string;
};
export type QueryContract = {
  outputValues: any[];
  outputData: string;
};
export type Contract = {
  id: string;
  deployerWalletID: string;
  deploymentTransactionId: string;
  txHash: string;
  abiJson: string;
  archived: boolean;
  blockchain: string;
  bytecode: string;
  contractAddress: string;
  contractInputType: string;
  deployerAddress: string;
  deployerUserID?: string;
  deploymentErrorReason?: string;
  deploymentErrorDetails?: string;
  name: string;
  description: string;
  status: string;
  verificationStatus: string;
  metadataLink: string;
  updateDate: string;
  createDate: string;
  sourceCode?: {
    fileName: string;
    fileContent: string;
  }[];
  functions?: {
    name: string;
    stateMutability: string;
    type: string;
    inputs: {
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
    outputs?: {
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
  }[];
  events?: {
    name: string;
    type: string;
    anonymous: boolean;
    inputs: {
      components?: any[];
      indexed: boolean;
      name: string;
      type: string;
      flattenedType?: string;
    }[];
  }[];
  implementationContract?: any;
};
export type EventMonitor = {
  id: string;
  blockchain: string;
  contractAddress: string;
  eventSignature: string;
  eventSignatureHash: string;
  isEnabled: boolean;
  createDate: string;
  updateDate: string;
};
export type EventLog = {
  blockHash: string;
  blockHeight: number;
  blockchain: string;
  contractAddress: string;
  data: string;
  eventSignature: string;
  eventSignatureHash: string;
  firstConfirmDate: string;
  id: string;
  logIndex: string;
  topics: string[];
  txHash: string;
  userOpHash: string;
};
