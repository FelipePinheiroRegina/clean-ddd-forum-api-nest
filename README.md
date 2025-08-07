# Clean DDD Forum API (NestJS)

Uma API de fórum construída com NestJS, seguindo princípios de Domain-Driven Design (DDD), arquitetura limpa e boas práticas de engenharia de software. O projeto visa ser um exemplo robusto e escalável para aplicações backend modernas, com separação clara de domínios, casos de uso e infraestrutura.

---

## Sumário
1. [Introdução](#introdução)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Patterns e Arquitetura](#patterns-e-arquitetura)
4. [Testes e Casos de Uso](#testes-e-casos-de-uso)
5. [Rotas Disponíveis](#rotas-disponíveis)
6. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
7. [Fluxo da Aplicação](#fluxo-da-aplicação)
8. [Como Rodar Localmente](#como-rodar-localmente)
9. [Créditos](#créditos)

---

## Introdução

Este projeto implementa uma API de fórum, permitindo cadastro de usuários, autenticação, criação de perguntas e listagem de perguntas recentes. O código é organizado para facilitar manutenção, testes e evolução, servindo como referência para projetos que buscam aplicar DDD e arquitetura limpa com NestJS.

---

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de APIs escaláveis e testáveis.
- **Prisma ORM**: Mapeamento objeto-relacional para PostgreSQL.
- **PostgreSQL**: Banco de dados relacional robusto e open source.
- **Zod**: Validação de dados e schemas.
- **JWT**: Autenticação baseada em tokens.
- **BcryptJS**: Hash de senhas.
- **Vitest**: Testes unitários e de integração.
- **ESLint & Prettier**: Padronização e qualidade de código.

---

## Patterns e Arquitetura

O projeto adota diversos patterns e princípios de arquitetura:

### Domain-Driven Design (DDD)
- **Domínio isolado**: Lógica de negócio separada da infraestrutura.
- **Entidades**: Objetos com identidade única e ciclo de vida próprio (`Entity`).
- **Aggregate Root**: Raiz de agregados, responsável por manter a consistência do cluster de entidades relacionadas (`AggregateRoot`).
- **Value Object**: Objetos de valor imutáveis, como Slug.
- **Domain Events**: Eventos de domínio para propagar mudanças e acionar side-effects (`DomainEvent`, `DomainEvents`).
- **Watched List**: Lista observada para rastrear adições e remoções em coleções de entidades.
- **Repositórios**: Abstração para persistência e recuperação de entidades, desacoplando domínio do banco de dados.

### Arquitetura Limpa
- **Camada de Casos de Uso**: Orquestra a lógica de negócio, intermediando entre controllers e domínio.
- **Controllers**: Recebem requisições HTTP, validam dados e delegam para casos de uso.
- **Injeção de Dependências**: Utilização de decorators do NestJS para inversão de controle.
- **Validação**: Uso de Zod para schemas e validação robusta.

---

## Testes e Casos de Uso

O projeto possui cobertura de testes para:
- Criação, atualização, deleção e listagem de perguntas e respostas
- Comentários em perguntas e respostas
- Escolha de melhor resposta
- Notificações de eventos
- Autenticação e cadastro de usuários
- Testes de domínio (entidades, eventos, listas observadas)

Os testes estão localizados em:
- `src/domain/forum/application/use-cases/*.test.ts`
- `src/domain/notification/application/use-cases/*.test.ts`
- `src/core/entities/*.test.ts`
- `src/core/events/*.test.ts`
- `src/controllers/*.e2e.test.ts`

---

## Rotas Disponíveis

| Método | Rota                        | Descrição                  |
|--------|-----------------------------|----------------------------|
| POST   | /questions/create           | Criação de pergunta        |
| GET    | /questions/list_recent_questions | Lista perguntas recentes  |
| POST   | /accounts                   | Criação de conta           |
| POST   | /sessions                   | Autenticação (login)       |

---

## Modelagem do Banco de Dados

```mermaid
erDiagram
  User {
    String id
    String name
    String email
    String password
  }
  Question {
    String id
    String title
    String content
    String slug
    DateTime createdAt
    DateTime updatedAt
    String authorId
  }
  User ||--o{ Question : "has many"
  Question }o--|| User : "belongs to"
```

---

## Fluxo da Aplicação

```mermaid
flowchart TD
  A[Usuário] -->|Envia requisição HTTP| B[Controller]
  B -->|Valida e repassa| C[Use Case]
  C -->|Acessa| D[Domínio]
  C -->|Consulta/Salva| E[Repositório]
  E -->|Comunica| F[(Banco de Dados)]
  F -->|Retorna dados| E
  E -->|Retorna entidades| C
  C -->|Retorna resposta| B
  B -->|Responde| A
  subgraph Domínios
    D
  end
  subgraph Casos de Uso
    C
  end
  subgraph Infraestrutura
    E
    F
  end
```

---

## Estrutura de Pastas

```
src/
  app.module.ts
  app.service.ts
  main.ts
  env.ts
  controllers/
    authenticate.controller.ts
    create-account.controller.ts
    create-question.controller.ts
    list-recent-questions.controller.ts
    ...
  auth/
    auth.module.ts
    current-user.decorator.ts
    jwt.strategy.ts
  core/
    entities/
      aggregate-root.ts
      entity.ts
      unique-entity-id.ts
      watched-list.ts
      ...
    events/
      domain.event.ts
      domain.events.ts
      event-handler.ts
      ...
    errors/
    repositories/
    types/
  domain/
    forum/
      enterprise/
        entities/
          question.ts, answer.ts, ...
          value-objects/
            slug.ts
        events/
          answer-created-event.ts
          question-best-answer-chosen-event.ts
      application/
        use-cases/
          create-question.ts, answer-question.ts, ...
        subscribers/
        repositories/
    notification/
      enterprise/
        entities/
      application/
        use-cases/
        repositories/
  pipes/
  prisma/
    prisma.service.ts
```

---

## Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd clean-ddd-forum-api-nest
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```
3. **Configure o banco de dados:**
   - Crie um banco PostgreSQL local
   - Defina a variável de ambiente `DATABASE_URL` no formato:
     ```typescript
     DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
     ```
4. **Rode as migrations do Prisma:**
   ```bash
   npx prisma migrate deploy
   # ou
   npx prisma migrate dev
   ```
5. **Inicie a aplicação:**
   ```bash
   pnpm start:dev
   # ou
   npm run start:dev
   # ou
   yarn start:dev
   ```
6. **Execute os testes:**
   ```bash
   pnpm test
   # ou
   npm test
   # ou
   yarn test
   ```

---

## Créditos

Projeto desenvolvido por Felipe Pinheiro.
