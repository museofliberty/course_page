'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { loadRazorpay } from '@/client/utils/razorpay';

interface RegistrationFormProps {
  courseId: string;
  courseName: string;
  price: number;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function RegistrationForm({ courseId, courseName, price }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      // Register user
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error);
      }

      // Load Razorpay
      const razorpay = await loadRazorpay();
      
      // Initialize payment
      const options = {
        key: result.key_id,
        amount: result.amount,
        currency: result.currency,
        name: courseName,
        description: 'Live Webinar Registration',
        order_id: result.order_id,
        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: result.user_id,
                amount: result.amount,
                courseName
              }),
            });

            const verifyResult = await verifyResponse.json();
            
            if (!verifyResponse.ok) {
              throw new Error(verifyResult.error);
            }

            toast.success('Registration successful! Check your email for details.');
            reset(); // Reset form
          } catch (error: any) {
            toast.error(error.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: '#0F172A',
        },
      };

      const rzp = new razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10}$/,
              message: 'Please enter a valid 10-digit phone number',
            },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        fullWidth
      >
        {loading ? 'Processing...' : `Register Now - ₹${price}`}
      </Button>
    </form>
  );
} 