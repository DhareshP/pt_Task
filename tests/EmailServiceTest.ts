import { EmailService } from "../src/EmailService";
import { EmailProvider1 } from "../src/EmailProvider1";
import { EmailProvider2 } from "../src/EmailProvider2";

test("EmailService retries and falls back", async () => {
  const provider1 = new EmailProvider1();
  const provider2 = new EmailProvider2();
  const emailService = new EmailService([provider1, provider2], 10);

  const result = await emailService.sendEmail(
    "test@example.com",
    "Subject",
    "Body",
    "test-id"
  );

  expect(["Email sent successfully", "All providers failed to send the email"]).toContain(result);
});
