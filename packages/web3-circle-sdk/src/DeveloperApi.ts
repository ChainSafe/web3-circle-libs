import { BaseApi } from './BaseApi';
import { SecretApi } from './SecretApi';
import { BASE_URL } from './constants';

export class DeveloperApi extends BaseApi {
  protected secret?: string;
  protected publicKey?: string;
  private secretApi: SecretApi;
  constructor(apiKey: string, secret?: string, baseUrl: string = BASE_URL) {
    super(apiKey, baseUrl);
    this.secret = secret;
    this.secretApi = new SecretApi(apiKey, baseUrl);
  }
  public setPublicKey(publicKey: string): void {
    this.publicKey = publicKey;
  }
  protected async generateCipherText(): Promise<string> {
    if (!this.secret) {
      throw new Error('Secret key are not set');
    }
    if (!this.publicKey) {
      this.publicKey = await this.secretApi.getPublicKey();
    }
    return SecretApi.getEntitySecretCiphertext(this.secret, this.publicKey);
  }
  protected async addCipherTextToParams<Param extends { [key: string]: unknown }>(
    params: Param,
  ): Promise<Param & { entitySecretCiphertext: string }> {
    return {
      ...params,
      entitySecretCiphertext: params.entitySecretCiphertext
        ? (params.entitySecretCiphertext as string)
        : await this.generateCipherText(),
    };
  }
  protected addCipherTextAndIdempotencyKeyToParams<
    Param extends { [key: string]: unknown },
  >(
    params: Param,
  ): Promise<Param & { entitySecretCiphertext: string; idempotencyKey: string }> {
    return this.addCipherTextToParams<Param & { idempotencyKey: string }>(
      this.addIdempotencyKeyToParams<Param>(params),
    );
  }
}
