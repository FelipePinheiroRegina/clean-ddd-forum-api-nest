import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { UpdateQuestionUseCase } from '@/domain/forum/application/use-cases/update-question'

const updateQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

export type UpdateQuestionBodySchema = z.infer<typeof updateQuestionBodySchema>
const validationPipe = new ZodValidationPipe(updateQuestionBodySchema)

@Controller('/questions/:id')
export class UpdateQuestionsController {
  constructor(private updateQuestion: UpdateQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(validationPipe) body: UpdateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') questionId: string,
  ) {
    const { title, content, attachments } = body
    const { sub: userId } = user

    const result = await this.updateQuestion.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: attachments,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
