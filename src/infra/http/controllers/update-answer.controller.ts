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
import { UpdateAnswerUseCase } from '@/domain/forum/application/use-cases/update-answer'

const updateAnswerBodySchema = z.object({
  content: z.string(),
})

export type UpdateAnswerBodySchema = z.infer<typeof updateAnswerBodySchema>
const validationPipe = new ZodValidationPipe(updateAnswerBodySchema)

@Controller('/answers/:id')
export class UpdateAnswerController {
  constructor(private updateAnswer: UpdateAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(validationPipe) body: UpdateAnswerBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content } = body
    const { sub: userId } = user

    const result = await this.updateAnswer.execute({
      authorId: userId,
      content,
      attachmentsIds: [],
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
