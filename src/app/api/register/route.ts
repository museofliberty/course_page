import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { PaymentService } from '@/server/services/payment.service';
import { sendEmail } from '@/lib/email';
import { validateEmail, validatePhone, validateName } from '@/server/utils/validation';

export const maxDuration = 60; // Set maximum duration to 60 seconds

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate input
    if (!validateName(name)) {
      return NextResponse.json(
        { error: 'Invalid name format' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Connect to database with timeout
    const dbPromise = connectToDatabase();
    const dbTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database connection timeout')), 5000)
    );
    
    await Promise.race([dbPromise, dbTimeout]);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already registered' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      courseId: process.env.WEBINAR_COURSE_ID,
      status: 'pending'
    });

    // Create Razorpay order with timeout
    const orderPromise = PaymentService.createOrder(599);
    const orderTimeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Order creation timeout')), 5000)
    );
    
    const order = await Promise.race([orderPromise, orderTimeout]);

    // Send welcome email (non-blocking)
    sendEmail({
      to: email,
      subject: 'Welcome to Mutual Fund Masterclass',
      html: `
        <h1>Welcome to Mutual Fund Masterclass!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering for our Mutual Fund Masterclass. Your registration has been received.</p>
        <p>Please complete your payment to access the course.</p>
        <p>Best regards,<br>Mutual Fund Masterclass Team</p>
      `
    }).catch(error => {
      console.error('Failed to send welcome email:', error);
      // Don't throw error, as email sending is not critical
    });

    return NextResponse.json({
      success: true,
      userId: user._id,
      orderId: order.id,
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR'
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    );
  }
} 