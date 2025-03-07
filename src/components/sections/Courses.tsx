'use client';
import Button from '../common/Button';
import Image from 'next/image';
import { FaCheckCircle, FaQuestionCircle, FaBookOpen, FaClock, FaArrowRight, FaGraduationCap, FaChartLine } from 'react-icons/fa';
import { useState } from 'react';
import RegistrationModal from '../common/RegistrationModal';
import PaymentButton from '../payment/PaymentButton';

interface WebinarFeature {
  title: string;
  description: string;
  icon: string;
}

const features: WebinarFeature[] = [
  {
    title: "Live Interactive Session",
    description: "2-3 hours of comprehensive mutual fund education with real-time doubt clearing",
    icon: "🎯"
  },
  {
    title: "Expert Guidance",
    description: "Learn from AMFI-registered Mutual Fund Advisor with 7+ years of experience",
    icon: "👨‍🏫"
  },
  {
    title: "Practical Knowledge",
    description: "Real-world strategies and case studies from managing 10Cr+ investments",
    icon: "📊"
  },
  {
    title: "Malayalam Medium",
    description: "Learn complex financial concepts in your native language for better understanding",
    icon: "🗣️"
  }
];

const learningOutcomes = [
  {
    title: 'Portfolio Management',
    points: [
      'How to manage your mutual fund portfolio effectively',
      'How to diversify mutual funds based on risk profile',
      'How to achieve your financial goals through strategic investing'
    ]
  },
  {
    title: 'Investment Strategies',
    points: [
      'How to leverage SIP, BWP, and STP in mutual funds',
      'Which mutual funds to invest in for safe returns',
      'How to tackle market corrections or crashes'
    ]
  }
];

const commonDoubts = [
  'Lump sum or SIP?',
  'SWP or STP?',
  'Direct plan or regular?',
  'Active funds or passive funds?',
  'Expense ratio? NAV?',
  'Mutual fund diversification?'
];

const learningModules = [
  {
    title: "Portfolio Management",
    description: "Master the art of managing and optimizing your mutual fund portfolio",
    duration: "45 mins"
  },
  {
    title: "Fund Selection",
    description: "Learn to identify and select the best mutual funds for your goals",
    duration: "30 mins"
  },
  {
    title: "Risk Management",
    description: "Understand market corrections and develop risk management strategies",
    duration: "30 mins"
  },
  {
    title: "Advanced Strategies",
    description: "Deep dive into SIP, SWP, STP, and other advanced concepts",
    duration: "45 mins"
  }
];

export default function Courses() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [userDetails, setUserDetails] = useState<null | {
    name: string;
    email: string;
    phone: string;
    userId: string;
  }>(null);

  const handleRegistration = async (formData: { name: string; email: string; phone: string }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

      setUserDetails({ ...formData, userId: data.userId });
      setShowModal(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Check your email for course access details.');
    setUserDetails(null);
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setShowModal(true);
  };

  return (
    <>
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Exclusive Live Webinar</h2>
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-3 sm:mb-4">
              Master Mutual Fund Investing
            </p>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Join us for an intensive masterclass where we cover everything you need to know about mutual fund investing
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-base sm:text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* What You Will Learn Section */}
          <div className="mb-12 sm:mb-20">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                What You Will Learn in This Mutual Fund Masterclass
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Master the essentials of mutual fund investing through our comprehensive curriculum
              </p>
              <div className="w-16 sm:w-20 h-1 bg-[#00D066] mx-auto rounded-full mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {learningOutcomes.map((category, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 sm:px-8 py-4 sm:py-6 flex items-center gap-3 sm:gap-4">
                    {idx === 0 ? (
                      <FaGraduationCap className="text-white text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                    ) : (
                      <FaChartLine className="text-white text-2xl sm:text-3xl flex-shrink-0 group-hover:scale-110 transition-transform" />
                    )}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:translate-x-2 transition-transform">
                        {category.title}
                      </h3>
                      <p className="text-green-100 mt-0.5 sm:mt-1 text-xs sm:text-sm">
                        {idx === 0 ? 'Master portfolio management techniques' : 'Learn advanced investment strategies'}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 sm:p-8">
                    <ul className="space-y-4 sm:space-y-6">
                      {category.points.map((point, index) => (
                        <li 
                          key={index} 
                          className="flex items-start gap-3 sm:gap-4 group/item hover:bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl transition-colors"
                        >
                          <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                            <FaCheckCircle className="text-green-600 text-base sm:text-lg group-hover/item:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                              {point}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 group-hover/item:text-gray-600 transition-colors">
                              {index === 0 ? 'Core Concept' : index === 1 ? 'Essential Strategy' : 'Advanced Technique'}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 sm:mt-8 text-center">
                      <a 
                        href="#join"
                        className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-700 text-sm sm:text-base group/link"
                      >
                        Learn More 
                        <FaArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Doubts Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                All Your Mutual Fund Doubts Sorted in 2-3 Hours
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Get clear answers to the most common questions about mutual fund investing
              </p>
              <div className="w-16 sm:w-20 h-1 bg-[#00D066] mx-auto rounded-full mt-3 sm:mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {[
                { question: "Lump sum or SIP?", icon: "💰" },
                { question: "SWP or STP?", icon: "📊" },
                { question: "Direct plan or regular?", icon: "🎯" },
                { question: "Active funds or passive funds?", icon: "⚡" },
                { question: "Expense ratio? NAV?", icon: "📈" },
                { question: "Mutual fund diversification?", icon: "🔄" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="mt-16 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Special Launch Offer</h3>
              <p className="opacity-90">Limited Time Only</p>
            </div>
            <div className="p-6">
              <div className="flex justify-center items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">₹599</span>
                <span className="text-xl text-gray-500 line-through">₹2000</span>
                <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                  70% OFF
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Live Interactive Session</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Q&A Session</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Session Recording Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Exclusive Study Materials</span>
                </li>
              </ul>
              <Button 
                variant="primary" 
                className="w-full hover:shadow-lg transition-shadow text-lg py-4"
                onClick={() => setShowModal(true)}
              >
                BOOK YOUR SLOT NOW
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RegistrationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setError('');
        }}
        courseName="Mutual Fund Masterclass"
        price="599"
        onSubmit={handleRegistration}
        isLoading={isLoading}
        error={error}
      />

      {userDetails && (
        <PaymentButton
          amount={599}
          courseName="Mutual Fund Masterclass"
          userId={userDetails.userId}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      )}
    </>
  );
} 