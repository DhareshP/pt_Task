import { EmailProvider } from "./EmailService";

export class EmailProvider2 implements EmailProvider {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`EmailProvider2: Sending email to ${to}`);
    if (Math.random() < 0.7) {
      throw new Error("EmailProvider2 failed");
    }
    return true;
  }
}
