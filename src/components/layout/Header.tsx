'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaClock, FaRegClock, FaTag, FaGift } from 'react-icons/fa';
import Button from '../common/Button';
import PaymentModal from '../common/PaymentModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 9, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-green-600">
            Marketvisa
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
          <div className="p-2 rounded-lg flex flex-col items-start gap-1">
  <div className="flex items-center gap-1">
    <FaTag className="w-4 h-4 text-[#00D066]" />
    <span className="text-xl font-bold text-[#00D066]">₹599</span> <span className="text-xs text-gray-400 line-through">₹2000</span>
  <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
    <FaGift className="w-3 h-3" /> 70% OFF
  </span>
  </div>
 
  <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
    <FaRegClock className="w-3 h-3" />
    <p>Ends in {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')} min</p>
  </div>
</div>
         
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-xs rounded"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Button */}
          <div className="flex items-center justify-between md:hidden p-2">
  <div className="flex flex-col space-y-0.5 mr-2">
    <div className="flex items-center gap-1">
      <FaTag className="w-2.5 h-2.5 text-[#00D066]" />
      <span className="text-[10px] font-bold text-[#00D066]">₹599</span>
      <div className="flex items-center gap-1">
      <span className="text-[8px] text-gray-400 line-through">₹2000</span>
      <span className="bg-yellow-100 text-yellow-800 text-[7px] font-bold px-1 py-0.5 rounded flex items-center gap-1">
        <FaGift className="w-2.5 h-2.5" /> 70% OFF
      </span>
    </div>
    </div>
    
    <div className="flex items-center gap-1 text-red-600 text-[8px] font-medium">
      <FaRegClock className="w-2.5 h-2.5" />
      <p>
        Ends in {timeLeft.minutes}:
        {timeLeft.seconds.toString().padStart(2, "0")} min
      </p>
    </div>
  </div>

  <Button 
    className="bg-green-600 hover:bg-green-700 text-white text-[9px] px-2 py-1 rounded"
    onClick={() => setShowModal(true)}
  >
    Book Now
  </Button>
</div>





          {/* <Button 
            className="md:hidden bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={() => setShowModal(true)}
          >
            Join Now
          </Button> */}
        </nav>
      </header>

      <PaymentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
