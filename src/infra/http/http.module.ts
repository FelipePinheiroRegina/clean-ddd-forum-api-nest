import { Module } from '@nestjs/common'
import { AuthenticateController } from '@/infra/http/controllers/authenticate.controller'
import { CreateQuestionsController } from '@/infra/http/controllers/create-question.controller'
import { ListRecentQuestionsController } from '@/infra/http/controllers/list-recent-questions.controller'
import { CreateAccountController } from '@/infra/http/controllers/create-account.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionsController,
    ListRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
