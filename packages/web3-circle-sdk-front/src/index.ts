import { FaucetApi } from './FaucetApi';
import { MonitoredTokensApi } from './MonitoredTokensApi';
import { SecretApi } from './SecretApi';
import { SignApi } from './SignApi';
import { SmartContractApi } from './SmartContractApi';
import { SmartContractEventMonitorApi } from './SmartContractEventMonitorApi';
import { SmartContractTemplateApi } from './SmartContractTemplateApi';
import { TokenLookupApi } from './TokenLookupApi';
import { TransactionApi } from './TransactionApi';
import { WalletApi } from './WalletApi';
import { WalletSetApi } from './WalletSetApi';

// types and constants
export * from './constants';
export * from './types';

// api groups
export * from './SecretApi';
export * from './SignApi';
export * from './SignInApi';
export * from './SmartContractApi';
export * from './SmartContractEventMonitorApi';
export * from './SmartContractTemplateApi';
export * from './TokenLookupApi';
export * from './TransactionApi';
export * from './WalletApi';
export * from './WalletSetApi';
export * from './FaucetApi';
export * from './MonitoredTokensApi';

export class CircleSdk {
  private _authToken: string;
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
  public faucet: FaucetApi;
  public monitoredTokens: MonitoredTokensApi;

  constructor(baseUrl: string, authToken: string) {
    this._baseUrl = baseUrl;
    this._authToken = authToken;
    this.secret = new SecretApi(this._baseUrl, this._authToken);
    this.sign = new SignApi(this._baseUrl, this._authToken);
    this.smartContract = new SmartContractApi(this._baseUrl, this._authToken);
    this.smartContractEventMonitor = new SmartContractEventMonitorApi(
      this._baseUrl,
      this._authToken,
    );
    this.smartContractTemplate = new SmartContractTemplateApi(
      this._baseUrl,
      this._authToken,
    );
    this.tokenLookup = new TokenLookupApi(this._baseUrl, this._authToken);
    this.transaction = new TransactionApi(this._baseUrl, this._authToken);
    this.wallet = new WalletApi(this._baseUrl, this._authToken);
    this.walletSet = new WalletSetApi(this._baseUrl, this._authToken);
    this.faucet = new FaucetApi(this._baseUrl, this._authToken);
    this.monitoredTokens = new MonitoredTokensApi(this._baseUrl, this._authToken);
  }
}
