import express from 'express';
import { EmailService } from './EmailService';
import { EmailProvider1 } from './EmailProvider1';
import { EmailProvider2 } from './EmailProvider2';

const app = express();
app.use(express.json());

const provider1 = new EmailProvider1();
const provider2 = new EmailProvider2();
const emailService = new EmailService([provider1, provider2], 10);

app.post('/sendEmail', async (req, res) => {
  const { to, subject, body, id } = req.body;
  const result = await emailService.sendEmail(to, subject, body, id);
  res.json({ status: result });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
