import { EmailProvider } from "./EmailService";

export class EmailProvider1 implements EmailProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`EmailProvider1: Sending email to ${to}`);
    if (Math.random() < 0.5) {
      throw new Error("EmailProvider1 failed");
    }
    return true;
  }
}
