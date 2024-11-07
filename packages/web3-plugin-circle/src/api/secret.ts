import crypto from "crypto";
import forge from "node-forge";
import { BaseApi } from "./baseApi";

export class SecretApi extends BaseApi {
  static generateSecret(): string {
    return crypto.randomBytes(32).toString("hex");
  }
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
  async getPublicKey(): Promise<string> {
    return this.getRequest<string>(
      "/config/entity/publicKey",
      undefined,
      "publicKey",
    );
  }
}
