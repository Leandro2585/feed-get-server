import { SubmitFeedbackUsecase } from '.'
import { mock, MockProxy } from 'jest-mock-extended'
import { MailGateway } from '../gateways'
import { FeedbacksRepository } from '../repositories'

describe('Submit Feedback', () => {
  let feedbacksRepository: MockProxy<FeedbacksRepository>
  let mailGateway: MockProxy<MailGateway>
  let sut: SubmitFeedbackUsecase

  beforeEach(() => {
    mailGateway = mock()
    feedbacksRepository = mock()
  })

  beforeAll(() => {
    sut = new SubmitFeedbackUsecase(feedbacksRepository, mailGateway)
  })

  test('should be able to submit a feedback', async () => {
    const result = sut.execute({ type: 'BUG', comment: 'example comment', screenshot: 'data:image/png;base64,gdd434fsdt45' })
    await expect(result).resolves.not.toThrow()
    expect(mailGateway.sendMail).toHaveBeenCalled()
    expect(feedbacksRepository.create).toHaveBeenCalled()
  })

  test('should not be able to submit a feedback without type', async () => {
    const result = sut.execute({ type: '', comment: 'example comment', screenshot: 'data:image/png;base64,gdd434fsdt45' })
    await expect(result).rejects.toThrow()
  })

  test('should not be able to submit a feedback without comment', async () => {
    const result = sut.execute({ type: 'BUG', comment: '', screenshot: 'data:image/png;base64,gdd434fsdt45' })
    await expect(result).rejects.toThrow()
  })

  test('should not be able to submit a feedback with an invalid screenshot', async () => {
    const result = sut.execute({ type: 'BUG', comment: 'ta tudo bugado', screenshot: 'teste.jpg' })
    await expect(result).rejects.toThrow()
  })
})