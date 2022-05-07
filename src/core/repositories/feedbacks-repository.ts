export interface FeedbacksRepository {
  create: (data: FeedbacksRepository.CreateData) => Promise<void>
}

export namespace FeedbacksRepository {
  export type CreateData = {
    type: string
    comment: string
    screenshot?: string
  }
}