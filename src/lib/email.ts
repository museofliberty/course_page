import nodemailer from 'nodemailer';
import { config } from '@/config/env';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Skip email sending if SMTP is not configured
  if (!config.smtp.enabled) {
    console.log('SMTP not configured, skipping email:', { to, subject });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: true,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass
      }
    });

    await transporter.sendMail({
      from: config.smtp.user,
      to,
      subject,
      html
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
} 