import { SubmitFeedbackUsecase } from '../core/usecases'
import { NodemailerMailGateway } from '../infra/gateways'
import { PrismaFeedbacksRepository } from '../infra/prisma/repositories'

export const makeSubmitFeedbackUsecase = () => {
  const mailGateway = new NodemailerMailGateway()
  const repository = new PrismaFeedbacksRepository()
  return new SubmitFeedbackUsecase(repository, mailGateway)
}