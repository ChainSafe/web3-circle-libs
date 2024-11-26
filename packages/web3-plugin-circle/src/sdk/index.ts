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

export class CircleSDK {
  private _apiKey: string;
  private _secret: string;
  private _publicKey?: string;
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

  constructor(
    apiKey: string,
    secret: string,
    publicKey?: string,
    baseUrl: string = BASE_URL,
  ) {
    this._apiKey = apiKey;
    this._secret = secret;
    this._publicKey = publicKey;
    this._baseUrl = baseUrl;

    this.secret = new SecretApi(this._baseUrl, this._apiKey);
    this.sign = new SignApi(this._baseUrl, this._apiKey, this._secret, this._publicKey);
    this.smartContract = new SmartContractApi(
      this._baseUrl,
      this._apiKey,
      this._secret,
      this._publicKey,
    );
    this.smartContractEventMonitor = new SmartContractEventMonitorApi(
      this._baseUrl,
      this._apiKey,
    );
    this.smartContractTemplate = new SmartContractTemplateApi(
      this._baseUrl,
      this._apiKey,
      this._secret,
      this._publicKey,
    );
    this.tokenLookup = new TokenLookupApi(this._baseUrl, this._apiKey);
    this.transaction = new TransactionApi(
      this._baseUrl,
      this._apiKey,
      this._secret,
      this._publicKey,
    );
    this.wallet = new WalletApi(
      this._baseUrl,
      this._apiKey,
      this._secret,
      this._publicKey,
    );
    this.walletSet = new WalletSetApi(
      this._baseUrl,
      this._apiKey,
      this._secret,
      this._publicKey,
    );
  }
}
