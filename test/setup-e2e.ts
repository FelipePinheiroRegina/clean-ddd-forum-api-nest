import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'

const schemaId = `schema_${randomUUID().replace(/-/g, '_')}`

function buildDbUrlWithSchema(schema: string) {
  const base = process.env.DATABASE_URL
  if (!base) throw new Error('DATABASE_URL not set')
  const url = new URL(base)
  url.searchParams.set('schema', schema)
  return url.toString()
}

let prisma: PrismaClient

beforeAll(async () => {
  // 1) aponta o Prisma CLI e seu app para um schema único deste arquivo
  process.env.DATABASE_URL = buildDbUrlWithSchema(schemaId)

  // 2) cria o schema do zero
  execSync('pnpm prisma db push', { stdio: 'inherit' })

  // 3) só AGORA crie o client (pega a URL certa)
  prisma = new PrismaClient()
}, 30_000)

afterAll(async () => {
  // derruba tudo que foi criado neste arquivo
  try {
    await prisma?.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
    )
  } finally {
    await prisma?.$disconnect()
  }
})

// Desse jeito não funciona no Windows

// import 'dotenv/config'
// import { PrismaClient } from '@prisma/client'
// import { randomUUID } from 'node:crypto'
// import { execSync } from 'node:child_process'

// const prisma = new PrismaClient()

// function generateUniqueDatabaseUrl(schemaId: string) {
//   if (!process.env.DATABASE_URL) {
//     throw new Error('DATABASE_URL is not set in the environment variables')
//   }

//   const url = new URL(process.env.DATABASE_URL)

//   url.searchParams.set('schema', schemaId)

//   return url.toString()
// }

// const schemaId = randomUUID()

// beforeAll(() => {
//   const databaseUrl = generateUniqueDatabaseUrl(schemaId)

//   process.env.DATABASE_URL = databaseUrl

//   execSync('pnpm prisma migrate deploy')
// })

// afterAll(async () => {
//   await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
//   await prisma.$disconnect()
// })
