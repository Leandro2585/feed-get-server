export interface MailGateway {
  sendMail: (data: MailGateway.Input) => Promise<void>
}

export namespace MailGateway {
  export type Input = {
    subject: string
    body: string
  }
}