import { NextResponse } from 'next/server';
import { UserService } from '@/server/services/user.service';
import { PaymentService } from '@/server/services/payment.service';
import { validateEmail, validatePhone, validateName } from '@/server/utils/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email and phone are required' },
        { status: 400 }
      );
    }

    // Validate name
    if (!validateName(name)) {
      return NextResponse.json(
        { error: 'Name should be between 2 and 50 characters' },
        { status: 400 }
      );
    }

    // Validate email
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone
    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'You have already registered for this webinar' },
        { status: 400 }
      );
    }

    // Create user
    const user = await UserService.createUser({
      name,
      email,
      phone
    });

    // Create Razorpay order
    const amount = 599 * 100; // ₹599 in paise
    const order = await PaymentService.createOrder({
      amount,
      userId: user._id!.toString(),
      courseId: process.env.WEBINAR_COURSE_ID!
    });

    return NextResponse.json({
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR',
      order_id: order.id,
      user_id: user._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
} 