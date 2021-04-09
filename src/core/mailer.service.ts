import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    recipientMail: string,
    text: string,
    subject = 'Testing Nest MailerModule ✔',
  ) {
    return this.mailerService.sendMail({
      to: recipientMail, // list of receivers
      subject: subject, // Subject line
      text: text, // plaintext body
    });
  }
}
