import { MailGateway } from '../gateways'
import { FeedbacksRepository } from '../repositories'

export class SubmitFeedbackUsecase {
  constructor (private readonly feedbacksRepository: FeedbacksRepository, private readonly mailGateway: MailGateway) {}
  async execute(input: SubmitFeedbackUsecase.Input) {
    if (!input.type) throw new Error('Type is required.')
    if (!input.comment) throw new Error('Comment is required.')
    if(input.screenshot && !input.screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }
    await this.feedbacksRepository.create(input)
    await this.mailGateway.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style='font-family: sans-serif; font-size: 16px; color: #111;'>`,
        `<p>Tipo de feedback: ${input.type}`,
        `<p>Comentário: ${input.comment}</p>`,
        input.screenshot ? `<img src='${input.screenshot}'/>` : ``,
        `</div>`
      ].join('\n')
    })
  }
}

export namespace SubmitFeedbackUsecase {
  export type Input = {
    type: string
    comment: string
    screenshot?: string
  }
}