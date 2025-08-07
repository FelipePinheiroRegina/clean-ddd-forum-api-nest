import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Express } from 'express'
import { hash } from 'bcryptjs'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Authenticate Controller (e2e)', () => {
  let app: INestApplication<Express>
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    await app.init()
  })

  it('[POST] /sessions', async () => {
    const password = '123456'
    const email = 'jho@email.com'

    await studentFactory.makePrismaStudent({
      name: 'John Doe',
      email,
      password: await hash(password, 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email,
      password,
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      accessToken: expect.any(String) // eslint-disable-line
    })
  })
})
