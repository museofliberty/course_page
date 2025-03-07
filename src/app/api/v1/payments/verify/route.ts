import { NextResponse } from 'next/server';
import { PaymentService } from '@/server/services/payment.service';
import { UserService } from '@/server/services/user.service';
import { EmailService } from '@/server/services/email.service';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      amount,
      courseName
    } = await request.json();

    const isValid = await PaymentService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get user details
    const user = await UserService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update user status to active
    await UserService.updateStatus(userId, 'active');

    // Send confirmation email
    await EmailService.sendPaymentConfirmation(
      user.email,
      user.name,
      courseName,
      amount / 100 // Convert from paise to rupees
    );

    return NextResponse.json({
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
} 