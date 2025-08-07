import { EncryptGenerator } from '@/domain/forum/application/cryptography/encrypt-generator'

export class FakeEncryptGenerator implements EncryptGenerator {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
