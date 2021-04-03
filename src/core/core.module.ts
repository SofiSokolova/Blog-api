import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { config, ConfigModule } from '../config/config.module';
import { MailService } from './mailer.service';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: config.nodemailer.host,
        port: config.nodemailer.port,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: config.nodemailer.email,
          pass: config.nodemailer.password,
        },
        defaults: {
          from: `${config.nodemailer.email}`,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class CoreModule {}