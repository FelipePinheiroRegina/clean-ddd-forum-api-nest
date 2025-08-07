import { Module } from '@nestjs/common'

import { EncryptGenerator } from '@/domain/forum/application/cryptography/encrypt-generator'
import { CompareGenerator } from '@/domain/forum/application/cryptography/compare-generator'
import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'

import { JwtEncryptGenerator } from './jwt-encrypt-generator'
import { BcryptHashGenerator } from './bcrypt-hash-generator'

@Module({
  providers: [
    { provide: EncryptGenerator, useClass: JwtEncryptGenerator },
    { provide: HashGenerator, useClass: BcryptHashGenerator },
    { provide: CompareGenerator, useClass: BcryptHashGenerator },
  ],
  exports: [HashGenerator, CompareGenerator, EncryptGenerator],
})
export class CryptographyModule {}
