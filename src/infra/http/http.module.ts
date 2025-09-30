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
import { AnswerQuestionsController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { UpdateAnswerController } from './controllers/update-answer.controller'
import { UpdateAnswerUseCase } from '@/domain/forum/application/use-cases/update-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { ListQuestionAnswersController } from './controllers/list-question-anwers.controller'
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers'
import { ChooseBestAnswerToQuestionController } from './controllers/choose-question-best-answer.controller'
import { ChooseBestAnswerToQuestionUseCase } from '@/domain/forum/application/use-cases/choose-best-answer-to-question'
import { CommentOnQuestionsController } from './controllers/comment-on-question.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { CommentOnAnswersController } from './controllers/comment-on-answer.controller'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { ListQuestionCommentController } from './controllers/list-question-comments.controller'
import { ListQuestionCommentUseCase } from '@/domain/forum/application/use-cases/list-question-comment'
import { ListAnswerCommentController } from './controllers/list-answer-comments.controller'
import { ListAnswerCommentUseCase } from '@/domain/forum/application/use-cases/list-answer-comment'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { ReadNotificationController } from './controllers/read-notification.controller'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionsController,
    ListRecentQuestionsController,
    GetQuestionBySlugController,
    UpdateQuestionsController,
    DeleteQuestionController,
    AnswerQuestionsController,
    UpdateAnswerController,
    DeleteAnswerController,
    ListQuestionAnswersController,
    ChooseBestAnswerToQuestionController,
    CommentOnQuestionsController,
    DeleteQuestionCommentController,
    CommentOnAnswersController,
    DeleteAnswerCommentController,
    ListQuestionCommentController,
    ListAnswerCommentController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    UpdateQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    UpdateAnswerUseCase,
    DeleteAnswerUseCase,
    ListQuestionAnswersUseCase,
    ChooseBestAnswerToQuestionUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    ListQuestionCommentUseCase,
    ListAnswerCommentUseCase,
    UploadAndCreateAttachmentUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}
