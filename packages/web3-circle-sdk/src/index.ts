import { SecretApi } from './SecretApi';
import { SignApi } from './SignApi';
import { SmartContractApi } from './SmartContractApi';
import { SmartContractEventMonitorApi } from './SmartContractEventMonitorApi';
import { SmartContractTemplateApi } from './SmartContractTemplateApi';
import { TokenLookupApi } from './TokenLookupApi';
import { TransactionApi } from './TransactionApi';
import { WalletApi } from './WalletApi';
import { WalletSetApi } from './WalletSetApi';
import { BASE_URL } from './constants';

// types and constants
export * from './constants';
export * from './types';

// api groups
export * from './SecretApi';
export * from './SignApi';
export * from './SmartContractApi';
export * from './SmartContractEventMonitorApi';
export * from './SmartContractTemplateApi';
export * from './TokenLookupApi';
export * from './TransactionApi';
export * from './WalletApi';
export * from './WalletSetApi';

// main sdk
export class CircleSDK {
  private _apiKey: string;
  private _secret: string;
  private _baseUrl: string;
  public secret: SecretApi;
  public sign: SignApi;
  public smartContract: SmartContractApi;
  public smartContractEventMonitor: SmartContractEventMonitorApi;
  public smartContractTemplate: SmartContractTemplateApi;
  public tokenLookup: TokenLookupApi;
  public transaction: TransactionApi;
  public wallet: WalletApi;
  public walletSet: WalletSetApi;

  constructor(apiKey: string, secret: string, baseUrl: string = BASE_URL) {
    this._apiKey = apiKey;
    this._secret = secret;
    this._baseUrl = baseUrl;

    this.secret = new SecretApi(this._apiKey, this._baseUrl);
    this.sign = new SignApi(this._apiKey, this._secret, this._baseUrl);
    this.smartContract = new SmartContractApi(this._apiKey, this._secret, this._baseUrl);
    this.smartContractEventMonitor = new SmartContractEventMonitorApi(
      this._apiKey,
      this._baseUrl,
    );
    this.smartContractTemplate = new SmartContractTemplateApi(
      this._apiKey,
      this._secret,
      this._baseUrl,
    );
    this.tokenLookup = new TokenLookupApi(this._apiKey, this._baseUrl);
    this.transaction = new TransactionApi(this._apiKey, this._secret, this._baseUrl);
    this.wallet = new WalletApi(this._apiKey, this._secret, this._baseUrl);
    this.walletSet = new WalletSetApi(this._apiKey, this._secret, this._baseUrl);
  }
  public async init(): Promise<void> {
    try {
      const publicKey = await this.secret.getPublicKey();
      this.sign.setPublicKey(publicKey);
      this.smartContract.setPublicKey(publicKey);
      this.smartContractTemplate.setPublicKey(publicKey);
      this.transaction.setPublicKey(publicKey);
      this.wallet.setPublicKey(publicKey);
      this.walletSet.setPublicKey(publicKey);
    } catch (e) {
      throw new Error(
        `Circle SDK Init error: PublicKey fetch error. ${(e as Error).message}`,
      );
    }
  }
}
