import { DeveloperApi } from './DeveloperApi';
import type {
  ListTransactionsParameters,
  GetTransactionParameters,
  CreateTransferTransactionParameters,
  Transaction,
  Transfer,
  ValidateAddressParameters,
  EstimateContractExecutionFeeParameters,
  EstimateTransferFeeParameters,
  CreateContractExecutionTransactionParameters,
  CancelTransactionParameters,
  AccelerateTransactionParameters,
  EstimateFee,
} from './types';

export class TransactionApi extends DeveloperApi {
  /**
   * Lists all transactions. Includes details such as status, source/destination, and transaction hash.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/list-transactions
   * @param params the parameters for the list transactions request
   * @returns the list of transactions
   */
  async list(params?: ListTransactionsParameters): Promise<Transaction[]> {
    return this.getRequest<Transaction[]>('/w3s/transactions', params, 'transactions');
  }

  /**
   * Retrieves info for a single transaction using it's unique identifier.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/get-transaction
   * @param params the parameters for the get transaction request
   * @returns the requested transaction
   */
  async get(params: GetTransactionParameters): Promise<Transaction> {
    const { id, ...rest } = params;
    return this.getRequest<Transaction>(`/w3s/transactions/${id}`, rest, 'transaction');
  }

  /**
   * Initiates an on-chain digital asset transfer from a specified developer-controlled wallet.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-transfer
   * @param params the parameters for the create transfer transaction request
   * @returns the new transfer transaction
   */
  async createTransfer(params: CreateTransferTransactionParameters): Promise<Transfer> {
    return this.postRequest<Transfer>(
      '/w3s/developer/transactions/transfer',
      await this.addCipherTextAndIdempotencyKeyToParams<CreateTransferTransactionParameters>(
        params,
      ),
    );
  }

  /**
   * Confirms that a specified address is valid for a given token on a certain blockchain.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-validate-address
   * @param params the parameters for the validate address request
   * @returns a value that indicates whether or not the address is valid
   */
  async validateAddress(params: ValidateAddressParameters): Promise<boolean> {
    return this.postRequest<boolean>(
      '/w3s/transactions/validateAddress',
      params,
      'isValid',
    );
  }

  /**
   * Estimates gas fees that will be incurred for a contract execution transaction,
   * given its ABI parameters and blockchain.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transaction-estimate-fee
   * @param params the parameters for the estimate contract execution transaction request
   * @returns the contract execution transaction estimate
   */
  async estimateContractExecutionFee(
    params: EstimateContractExecutionFeeParameters,
  ): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      '/w3s/transactions/contractExecution/estimateFee',
      params,
    );
  }

  /**
   * Estimates gas fees that will be incurred for a transfer transaction; given its amount, blockchain, and token.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-transfer-estimate-fee
   * @param params the parameters for the estimate transfer transaction request
   * @returns the transfer transaction estimate
   */
  async estimateTransferFee(params: EstimateTransferFeeParameters): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      '/w3s/transactions/transfer/estimateFee',
      params,
    );
  }

  /**
   * Creates a transaction which executes a smart contract. ABI parameters must be passed in the request.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-contract-execution
   * @param params the parameters for the create contract execution transaction request
   * @returns the new contract execution transaction
   */
  async createContractExecutionTransaction(
    params: CreateContractExecutionTransactionParameters,
  ): Promise<Transfer> {
    const data =
      await this.addCipherTextAndIdempotencyKeyToParams<CreateContractExecutionTransactionParameters>(
        params,
      );
    return this.postRequest<Transfer>(
      '/w3s/developer/transactions/contractExecution',
      data,
    );
  }

  /**
   * Cancels a specified transaction from a developer-controlled wallet. Gas fees may still be incurred.
   * This is a best-effort operation, it won't be effective if the original transaction has already been
   * processed by the blockchain.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-cancel
   * @param params the parameters for the cancel transaction request
   * @returns the cancelled transaction
   */
  async cancelTransaction(params: CancelTransactionParameters): Promise<Transfer> {
    const { id, ...rest } = params;
    return this.postRequest<Transfer>(
      `/w3s/developer/transactions/${id}/cancel`,
      await this.addCipherTextAndIdempotencyKeyToParams<
        Omit<CancelTransactionParameters, 'id'>
      >(rest),
    );
  }

  /**
   * Accelerates a specified transaction from a developer-controlled wallet. Additional gas fees may be incurred.
   * Accelerating a transaction can only occur when a transaction is in the SENT state.
   * https://developers.circle.com/api-reference/w3s/developer-controlled-wallets/create-developer-transaction-accelerate
   * @param params the parameters for the accelerate transaction request
   * @returns the accelerated transaction
   */
  async accelerateTransaction(
    params: AccelerateTransactionParameters,
  ): Promise<Transfer> {
    const { id, ...rest } = params;
    return this.postRequest<Transfer>(
      `/w3s/developer/transactions/${id}/accelerate`,
      await this.addCipherTextAndIdempotencyKeyToParams<
        Omit<AccelerateTransactionParameters, 'id'>
      >(rest),
    );
  }
}
