import crypto from "crypto";
import forge from "node-forge";
import { BaseApi } from "./BaseApi";
import { ConfigEntity } from "./types";

export class SecretApi extends BaseApi {
  /**
   * Generate a random 32-byte value
   * @returns a random 32-byte value formatted as a hex string
   */
  static generateSecret(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Encrypt the provided secret using the public key from the provided PEM key
   * @param secret the secret to encrypt
   * @param pemKey the PEM key to use to encrypt the secret
   * @returns the encrypted secret formatted as a base-64 string
   */
  static getEntitySecretCiphertext(secret: string, pemKey: string): string {
    const entitySecret = forge.util.hexToBytes(secret);
    const publicKey = forge.pki.publicKeyFromPem(pemKey);
    const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create(),
      },
    });

    return forge.util.encode64(encryptedData);
  }

  /**
   * Get an entity's public key from the Circle REST API
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/get-public-key
   * @returns the entity's public key
   */
  async getPublicKey(): Promise<string> {
    return this.getRequest<string>(
      "/config/entity/publicKey",
      undefined,
      "publicKey",
    );
  }

  /**
   * Get an entity's configuration from the Circle REST API
   * https://developers.circle.com/api-reference/w3s/programmable-wallets/get-entity-config
   * @returns the entity's configuration
   */
  async getConfig(): Promise<ConfigEntity> {
    return this.getRequest<ConfigEntity>("/config/entity");
  }
}
