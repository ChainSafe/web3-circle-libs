import {
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
} from "./types";
import { DeveloperApi } from "./DeveloperApi";
import { v4 } from "uuid";

export class TransactionApi extends DeveloperApi {
  async list(params?: ListTransactionsParameters): Promise<Transaction[]> {
    return this.getRequest<Transaction[]>(
      "/transactions",
      params,
      "transactions",
    );
  }
  async get(params: GetTransactionParameters): Promise<Transaction> {
    const { id, ...rest } = params;
    return this.getRequest<Transaction>(
      `/transactions/${id}`,
      rest,
      "transaction",
    );
  }
  async createTransfer(
    params: CreateTransferTransactionParameters,
  ): Promise<Transfer> {
    return this.postRequest<Transfer>("/developer/transactions/transfer", {
      ...params,
      idempotencyKey: params.idempotencyKey ?? v4(),
      entitySecretCiphertext: this.generateCipherText(),
    });
  }
  async validateAddress(params: ValidateAddressParameters): Promise<boolean> {
    return this.postRequest<boolean>(
      "/transactions/validateAddress",
      params,
      "isValid",
    );
  }

  async estimateContractExecutionFee(
    params: EstimateContractExecutionFeeParameters,
  ): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      "/transactions/contractExecution/estimateFee",
      params,
    );
  }

  async estimateTransferFee(
    params: EstimateTransferFeeParameters,
  ): Promise<EstimateFee> {
    return this.postRequest<EstimateFee>(
      "/transactions/transfer/estimateFee",
      params,
    );
  }

  async createContractExecutionTransaction(
    params: CreateContractExecutionTransactionParameters,
  ): Promise<Transfer> {
    return this.postRequest<Transfer>(
      "/developer/transactions/contractExecution",
      params,
    );
  }

  async cancelTransaction(
    params: CancelTransactionParameters,
  ): Promise<Transfer> {
    const { id, ...rest } = params;
    return this.postRequest<Transfer>(
      `/developer/transactions/${id}/cancel`,
      rest,
    );
  }

  async accelerateTransaction(
    params: AccelerateTransactionParameters,
  ): Promise<Transfer> {
    const { id, ...rest } = params;
    return this.postRequest<Transfer>(
      `/developer/transactions/${id}/accelerate`,
      rest,
    );
  }
}
