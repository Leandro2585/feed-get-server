import { FeedbacksRepository } from '../../../core/repositories';
import { prisma } from '../../../prisma';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbacksRepository.CreateData) {
    await prisma.feedback.create({ data })
  }
}