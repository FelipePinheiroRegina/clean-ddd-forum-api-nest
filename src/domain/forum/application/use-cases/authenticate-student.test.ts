import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncryptGenerator } from 'test/cryptography/fake-encrypt'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncryptGenerator: FakeEncryptGenerator
let sut: AuthenticateStudentUseCase

describe('Authenticate Student Use Case', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncryptGenerator = new FakeEncryptGenerator()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncryptGenerator,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = makeStudent({
      email: 'jho@email.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'jho@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String), // eslint-disable-line
    })
  })
})
