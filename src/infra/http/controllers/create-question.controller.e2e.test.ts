import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Express } from 'express'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Create Questions Controller (e2e)', () => {
  let app: INestApplication<Express>
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    await app.init()
  })

  it('[POST] /questions/create', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'joh@email.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/questions/create')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New questions test',
        content: 'content questions test',
      })

    expect(response.statusCode).toBe(201)

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        slug: 'new-questions-test',
      },
    })

    expect(questionOnDatabase).toBeTruthy()
  })
})
