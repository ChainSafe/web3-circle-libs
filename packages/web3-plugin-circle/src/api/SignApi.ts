import {
  SignMessageParameters,
  SignTypedDataParameters,
  SignTransactionParameters,
  SignDelegateActionParameters,
  SignedTransaction,
  SignedTransactionDelegate,
} from "./types";
import { DeveloperApi } from "./DeveloperApi";

export class SignApi extends DeveloperApi {
  async signMessage(params: SignMessageParameters): Promise<string> {
    return this.postRequest<string>(
      "/developer/sign/message",
      { ...params, entitySecretCiphertext: this.generateCipherText() },
      "signature",
    );
  }
  async signTypedData(params: SignTypedDataParameters): Promise<string> {
    return this.postRequest<string>(
      "/developer/sign/typedData",
      { ...params, entitySecretCiphertext: this.generateCipherText() },
      "signature",
    );
  }
  // This endpoint is only available for the following chains: SOL, SOL-DEVNET, NEAR, NEAR-TESTNET, EVM, TEST-TESTNET
  async signTransaction(
    params: SignTransactionParameters,
  ): Promise<SignedTransaction> {
    return this.postRequest<SignedTransaction>("/developer/sign/transaction", {
      ...params,
      entitySecretCiphertext: this.generateCipherText(),
    });
  }
  // This endpoint is only available for NEAR and NEAR-TESTNET
  async signDelegateAction(
    params: SignDelegateActionParameters,
  ): Promise<SignedTransactionDelegate> {
    return this.postRequest<SignedTransactionDelegate>(
      "/developer/sign/delegateAction",
      { ...params, entitySecretCiphertext: this.generateCipherText() },
    );
  }
}
