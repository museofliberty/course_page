'use client';
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaTimes } from 'react-icons/fa';
import Button from './Button';
import { validateEmail, validatePhone, validateName } from '@/server/utils/validation';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  price: string;
  onSubmit: (formData: { name: string; email: string; phone: string }) => void;
  isLoading?: boolean;
  error?: string;
}

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  courseName,
  price,
  onSubmit,
  isLoading = false,
  error
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      phone: ''
    };

    if (!validateName(formData.name)) {
      errors.name = 'Name should be between 2 and 50 characters';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Invalid phone number format';
    }

    setValidationErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Register for {courseName}
          </h3>
          <p className="text-gray-600">
            Price: ₹{price}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
} 