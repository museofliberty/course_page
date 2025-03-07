import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { PaymentService } from '@/server/services/payment.service';
import { sendEmail } from '@/lib/email';
import { validateEmail, validatePhone, validateName } from '@/server/utils/validation';

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

    // Connect to database
    await connectToDatabase();

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

    // Create Razorpay order
    const amount = 599; // ₹599
    const order = await PaymentService.createOrder(amount);

    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Mutual Fund Masterclass',
      html: `
        <h1>Welcome to Mutual Fund Masterclass!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering for our Mutual Fund Masterclass. Your registration has been received.</p>
        <p>Please complete your payment to access the course.</p>
        <p>Best regards,<br>Mutual Fund Masterclass Team</p>
      `
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
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
} 