import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

export const sendSMS = async (to: string, body: string): Promise<void> => {
  if (!accountSid || !authToken || !fromNumber) {
    console.warn('⚠️  Twilio credentials not configured. SMS not sent.');
    return;
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({ body, from: fromNumber, to });
    console.log(`✅ SMS sent to ${to}`);
  } catch (error: any) {
    // Non-fatal: log but don't crash the registration flow
    console.error(`❌ SMS failed to ${to}:`, error.message);
  }
};
