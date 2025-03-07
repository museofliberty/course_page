'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../common/Button';
import PaymentModal from '../common/PaymentModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'join', label: 'Workshop Details' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'courses', label: 'Course Details' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-green-600">
            Marketvisa
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* {navLinks.map(({ id, label }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-600 hover:text-green-600 transition-colors cursor-pointer"
                >
                  {label}
                </button>
              ))} */}
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Join Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-green-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`
              md:hidden fixed inset-x-0 top-[73px] bg-white border-t border-gray-100
              transition-all duration-300 ease-in-out transform
              ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
            `}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map(({ id, label }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(id)}
                  className="text-gray-600 hover:text-green-600 transition-colors py-2 text-left"
                >
                  {label}
                </button>
              ))}
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowModal(true);
                }}
              >
                Join Now
              </Button>
            </div>
          </div>
        </nav>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      /> 
    </>
  );
} 