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
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { UpdateQuestionsController } from './controllers/update-question.controller'
import { UpdateQuestionUseCase } from '@/domain/forum/application/use-cases/update-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionsController,
    ListRecentQuestionsController,
    GetQuestionBySlugController,
    UpdateQuestionsController,
    DeleteQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    UpdateQuestionUseCase,
    DeleteQuestionUseCase,
  ],
})
export class HttpModule {}
