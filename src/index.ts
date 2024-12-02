import { EmailService } from "./EmailService";
import { EmailProvider1 } from "./EmailProvider1";
import { EmailProvider2 } from "./EmailProvider2";

const provider1 = new EmailProvider1();
const provider2 = new EmailProvider2();
const emailService = new EmailService([provider1, provider2], 10);

(async () => {
  const result = await emailService.sendEmail(
    "test@example.com",
    "Test Subject",
    "Test Body",
    "unique-email-id-1"
  );
  console.log(result);
})();
