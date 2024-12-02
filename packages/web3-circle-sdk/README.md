# Circle SDK

This is a TypeScript SDK for interacting with the
[Circle Web3 Services REST API](https://developers.circle.com/api-reference/w3s/common/ping).
Keep reading for more information or refer to the comprehensive
[API documentation](https://chainsafe.github.io/web3-circle-libs/).

## Classes

This SDK exposes the following classes for interacting with the Circle Web3 Services REST
API:

- [`CircleSDK`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/index.ts)
  - This is a convenience class for working with all the other classes described below.
  - Instantiate with `const circle: CircleSDK = new CircleSDK(apiKey, secret);` then
    initialize with `await circle.init();`.
- [`SecretApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/SecretApi.ts)
  - Exposed by the `CircleSDK` class as the `secret` property (i.e. `CircleSDK.secret`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Get public key for entity](https://developers.circle.com/api-reference/w3s/programmable-wallets/get-public-key)
      (`SecretApi.getPublicKey`)
    - [Get configuration for entity](https://developers.circle.com/api-reference/w3s/programmable-wallets/get-entity-config)
      (`SecretApi.getConfig`)
- [`SignApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/SignApi.ts)
  - Exposed by the `CircleSDK` class as the `sign` property (i.e. `CircleSDK.sign`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Sign message](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-message)
      (`SignApi.signMessage`)
    - [Sign typed data](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-typed-data)
      (`SignApi.signTypedData`)
    - [Sign transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-transaction)
      (`SignApi.signTransaction`)
    - [Sign delegate action](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/sign-delegate-action)
      (`SignApi.signDelegateAction`)
- [`SmartContractApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/SmartContractApi.ts)
  - Exposed by the `CircleSDK` class as the `smartContract` property (i.e.
    `CircleSDK.smartContract`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [List contracts](https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-contracts)
      (`SmartContractApi.list`)
    - [Get a contract](https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-contract)
      (`SmartContractApi.get`)
    - [Update a contract](https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-contract)
      (`SmartContractApi.update`)
    - [Import a contract](https://developers.circle.com/api-reference/w3s/smart-contract-platform/import-contract)
      (`SmartContractApi.importContract`)
    - [Estimate a contract deployment](https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-deploy)
      (`SmartContractApi.estimateDeployment`)
    - [Deploy a contract](https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract)
      (`SmartContractApi.deploy`)
    - [Execute a query function on a contract](https://developers.circle.com/api-reference/w3s/smart-contract-platform/query-contract)
      (`SmartContractApi.query`)
- [`SmartContractEventMonitorApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/SmartContractEventMonitorApi.ts)
  - Exposed by the `CircleSDK` class as the `smartContractEventMonitor` property (i.e.
    `CircleSDK.smartContractEventMonitor`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Get event monitors](https://developers.circle.com/api-reference/w3s/smart-contract-platform/get-event-monitors)
      (`SmartContractEventMonitorApi.getEventMonitors`)
    - [Create event monitor](https://developers.circle.com/api-reference/w3s/smart-contract-platform/create-event-monitor)
      (`SmartContractEventMonitorApi.createEventMonitor`)
    - [Update an event monitor](https://developers.circle.com/api-reference/w3s/smart-contract-platform/update-event-monitor)
      (`SmartContractEventMonitorApi.updateEventMonitor`)
    - [Delete event monitor](https://developers.circle.com/api-reference/w3s/smart-contract-platform/delete-event-monitor)
      (`SmartContractEventMonitorApi.deleteEventMonitor`)
    - [Get event logs](https://developers.circle.com/api-reference/w3s/smart-contract-platform/list-event-logs)
      (`SmartContractEventMonitorApi.getEventLogs`)
- [`SmartContractTemplateApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/SmartContractTemplateApi.ts)
  - Exposed by the `CircleSDK` class as the `smartContractTemplate` property (i.e.
    `CircleSDK.smartContractTemplate`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Estimate fee for a contract template deployment](https://developers.circle.com/api-reference/w3s/smart-contract-platform/estimate-contract-template-deploy)
      (`SmartContractTemplateApi.estimateDeploymentFee`)
    - [Deploy a contract from a template](https://developers.circle.com/api-reference/w3s/smart-contract-platform/deploy-contract-template)
      (`SmartContractTemplateApi.deployContract`)
- [`TokenLookupApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/TokenLookupApi.ts)
  - Exposed by the `CircleSDK` class as the `tokenLookup` property (i.e.
    `CircleSDK.tokenLookup`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Get token details](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-token-id)
      (`TokenLookupApi.get`)
- [`TransactionApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/TransactionApi.ts)
  - Exposed by the `CircleSDK` class as the `transaction` property (i.e.
    `CircleSDK.transaction`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [List transactions](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-transactions)
      (`TransactionApi.list`)
    - [Get a transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-transaction)
      (`TransactionApi.get`)
    - [Create a transfer transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-transfer)
      (`TransactionApi.createTransfer`)
    - [Validate an address](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-validate-address)
      (`TransactionApi.validateAddress`)
    - [Estimate fee for a contract execution transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transaction-estimate-fee)
      (`TransactionApi.estimateContractExecutionFee`)
    - [Estimate fee for a transfer transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transfer-estimate-fee)
      (`TransactionApi.estimateTransferFee`)
    - [Create a contract execution transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-contract-execution)
      (`TransactionApi.createContractExecutionTransaction`)
    - [Cancel a transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-cancel)
      (`TransactionApi.cancelTransaction`)
    - [Accelerate a transaction](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-accelerate)
      (`TransactionApi.accelerateTransaction`)
- [`WalletApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/WalletApi.ts)
  - Exposed by the `CircleSDK` class as the `wallet` property (i.e. `CircleSDK.wallet`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Create wallets](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet)
      (`WalletApi.create`)
    - [List wallets](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallets)
      (`WalletApi.list`)
    - [Retrieve a wallet](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet)
      (`WalletApi.get`)
    - [Update a wallet](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet)
      (`WalletApi.update`)
    - [Get token balance for a wallet](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-balance)
      (`WalletApi.balance`)
    - [Get NFTs for a wallet](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-wallet-nfts)
      (`WalletApi.nfts`)
- [`WalletSetApi`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/WalletSetApi.ts)
  - Exposed by the `CircleSDK` class as the `walletSet` property (i.e.
    `CircleSDK.walletSet`).
  - Supports the following Circle Web3 Services REST API endpoints:
    - [Create a new wallet set](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-wallet-set)
      (`WalletSetApi.create`)
    - [Update a wallet set](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/update-wallet-set)
      (`WalletSetApi.update`)
    - [Get all wallet sets](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-sets)
      (`WalletSetApi.list`)
    - [Get a wallet set](https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-wallet-set)
      (`WalletSetApi.get`)

## Constants

Helpful constant variables are defined in
[`src/constants.ts`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/constants.ts).

## Types

The types for interacting with the Circle Web3 Services REST API are defined in
[`src/types.ts`](https://github.com/ChainSafe/web3-circle-libs/blob/main/packages/web3-circle-sdk/src/types.ts).
