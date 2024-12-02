export interface EmailProvider {
    sendEmail(to: string, subject: string, body: string): Promise<boolean>;
  }
  
  export class EmailService {
    private providers: EmailProvider[];
    private rateLimit: number;
    private sentEmails: Set<string>;
  
    constructor(providers: EmailProvider[], rateLimit: number) {
      this.providers = providers;
      this.rateLimit = rateLimit;
      this.sentEmails = new Set();
    }
  
    private async retry(
      fn: () => Promise<boolean>,
      retries: number,
      delay: number
    ): Promise<boolean> {
      try {
        return await fn();
      } catch (error) {
        if (retries <= 0) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retry(fn, retries - 1, delay * 2);
      }
    }
  
    public async sendEmail(
      to: string,
      subject: string,
      body: string,
      id: string
    ): Promise<string> {
      if (this.sentEmails.has(id)) {
        return "Duplicate request prevented";
      }
  
      for (const provider of this.providers) {
        try {
          const result = await this.retry(
            () => provider.sendEmail(to, subject, body),
            3,
            1000
          );
          if (result) {
            this.sentEmails.add(id);
            return "Email sent successfully";
          }
        } catch {
          console.error("Provider failed, switching to next");
        }
      }
  
      return "All providers failed to send the email";
    }
  }
  