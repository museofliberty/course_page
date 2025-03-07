'use client';
import { useState } from 'react';
import Button from '../common/Button';
import PaymentModal from '../common/PaymentModal';

interface RegistrationFormProps {
  courseId: string;
  courseName: string;
  price: number;
  originalPrice?: number;
}

export default function RegistrationForm({ courseId, courseName, price, originalPrice }: RegistrationFormProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{courseName}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-4">₹{price}</p>
      </div>

      <Button
        onClick={() => setShowPaymentModal(true)}
        fullWidth
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Pay Now
      </Button>

      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          courseName={courseName}
          price={price}
          originalPrice={originalPrice}
        />
      )}
    </div>
  );
}