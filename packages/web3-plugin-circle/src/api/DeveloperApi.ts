import { BaseApi } from './BaseApi';
import { SecretApi } from './SecretApi';

export class DeveloperApi extends BaseApi {
  protected secret?: string;
  protected publicKey?: string;
  constructor(baseUrl: string, apiKey: string, secret?: string, publicKey?: string) {
    super(baseUrl, apiKey);
    this.secret = secret;
    this.publicKey = publicKey;
  }
  protected generateCipherText(): string {
    if (!this.secret || !this.publicKey) {
      throw new Error('Secret and public key are not set');
    }
    return SecretApi.getEntitySecretCiphertext(this.secret, this.publicKey);
  }
  protected addCipherTextAndIdempotencyKeyToParams<
    Param extends { [key: string]: unknown },
  >(params: Param): Param & { entitySecretCiphertext: string; idempotencyKey: string } {
    return this.addIdempotencyKeyToParams<Param & { entitySecretCiphertext: string }>({
      ...params,
      entitySecretCiphertext: params.entitySecretCiphertext
        ? (params.entitySecretCiphertext as string)
        : this.generateCipherText(),
    });
  }
}
