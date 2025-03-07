'use client';
import { useState } from 'react';
import Button from '../common/Button';
import { loadRazorpay } from '@/client/utils/razorpay';

interface PaymentButtonProps {
  amount: number;
  courseName: string;
  userId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function PaymentButton({
  amount,
  courseName,
  userId,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create order
      const orderResponse = await fetch('/api/v1/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.error);

      // Load Razorpay
      const razorpay = await loadRazorpay();

      // Initialize payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Course Platform',
        description: `Payment for ${courseName}`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/v1/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                userId,
                amount: orderData.amount,
                courseName
              })
            });

            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(verifyData.error);

            onSuccess();
          } catch (error) {
            onError('Payment verification failed');
          }
        },
        prefill: {
          name: 'Student Name',
          email: 'student@example.com'
        },
        theme: {
          color: '#2563EB'
        }
      };

      const paymentObject = new razorpay(options);
      paymentObject.open();

    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className="w-full"
    >
      {loading ? 'Processing...' : 'Pay Now'}
    </Button>
  );
} 