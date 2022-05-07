import { Transporter, createTransport } from 'nodemailer';
import { MailGateway } from '../../core/gateways';

export class NodemailerMailGateway implements MailGateway {
  private transport: Transporter

  constructor () {
    this.transport = createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '3b2de574cc4790',
        pass: 'ca71b7e10fa5fb'
      }
    })
  }

  async sendMail({ body, subject }: MailGateway.Input): Promise<void> {
    await this.transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Leandro Real <leo.real2585@gmail.com>',
      subject,
      html: body
    })
  }
}