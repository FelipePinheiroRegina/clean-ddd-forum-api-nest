import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ChooseBestAnswerToQuestionUseCase } from '@/domain/forum/application/use-cases/choose-best-answer-to-question'

@Controller('/answers/:answerId/choose_best_answer_to_question')
export class ChooseBestAnswerToQuestionController {
  constructor(
    private chooseBestAnswerToQuestion: ChooseBestAnswerToQuestionUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const { sub: userId } = user

    const result = await this.chooseBestAnswerToQuestion.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
