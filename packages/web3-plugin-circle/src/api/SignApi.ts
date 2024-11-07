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
  async signTransaction(
    params: SignTransactionParameters,
  ): Promise<SignedTransaction> {
    return this.postRequest<SignedTransaction>("/developer/sign/transaction", {
      ...params,
      entitySecretCiphertext: this.generateCipherText(),
    });
  }
  async signDelegateAction(
    params: SignDelegateActionParameters,
  ): Promise<SignedTransactionDelegate> {
    return this.postRequest<SignedTransactionDelegate>(
      "/developer/sign/delegateAction",
      { ...params, entitySecretCiphertext: this.generateCipherText() },
    );
  }
}
