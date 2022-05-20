import { MailAdapter, SendMailAdapter } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ca86c1698d23d1",
      pass: "79fb892ce8137c",
    },
  });

export class NodeMailerMailAdapter implements MailAdapter{
    async sendMail( { subject, body }: SendMailAdapter){
    
    await transport.sendMail({
    from: "Feedback widget team",
    to: "Gilmara Pimentel <gilmarapq@hotmailcom>",
    subject: subject,
    html: body
  });

    }
}