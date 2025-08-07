export abstract class EncryptGenerator {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>
}
