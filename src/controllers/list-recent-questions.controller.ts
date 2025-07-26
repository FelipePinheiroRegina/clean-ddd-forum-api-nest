import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { z } from 'zod'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions/list_recent_questions')
@UseGuards(AuthGuard('jwt'))
export class ListRecentQuestionsController {
  constructor(private listRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const questions = this.listRecentQuestions.execute({
      page,
    })

    return { questions }
  }
}
