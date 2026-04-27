import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (to: string, subject: string, text: string): Promise<boolean> => {
  // Always log to console as dev fallback
  console.log(`\n📧 [MAILER] Sending to: ${to}`);
  console.log(`   Subject: ${subject}`);
  console.log(`   Body: ${text}`);

  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    console.log(`✅ Email sent to ${to}`);
    return true;
  } catch (error: any) {
    console.error('❌ Email failed:', error.message);
    console.warn(`⚠️  CODE (use this manually): ${text}`);
    return false; // signal to caller that email failed
  }
};
