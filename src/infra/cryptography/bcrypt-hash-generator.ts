import { CompareGenerator } from '@/domain/forum/application/cryptography/compare-generator'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHashGenerator implements HashGenerator, CompareGenerator {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
