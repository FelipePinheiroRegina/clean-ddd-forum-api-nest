import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Express } from 'express'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { hash } from 'bcryptjs'

describe('Authenticate Controller (e2e)', () => {
  let app: INestApplication<Express>
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  it('[POST] /sessions', async () => {
    const password = '123456'
    const email = 'jho@email.com'

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email,
        password: await hash(password, 8),
      },
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
