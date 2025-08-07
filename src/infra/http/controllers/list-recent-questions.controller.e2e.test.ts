import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Express } from 'express'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

type Question = {
  title: string
  slug: string
  content: string
  authorId: string
}

type Questions = Question[]

describe('List Recent Questions Controller (e2e)', () => {
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

    const questions: Questions = []
    for (let c = 1; c <= 3; c++) {
      questions.push({
        title: `Question 0${c}`,
        slug: `question-0${c}`,
        content: `question content 0${c}`,
        authorId: user.id,
      })
    }
    await prisma.question.createMany({
      data: questions,
    })

    const response = await request(app.getHttpServer())
      .get('/questions/list_recent_questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({ title: 'Question 01' }),
        expect.objectContaining({ title: 'Question 02' }),
        expect.objectContaining({ title: 'Question 03' }),
      ],
    })
  })
})
