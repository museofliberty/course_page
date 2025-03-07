'use client';
import { FaChartLine, FaUserGraduate, FaHandshake, FaAward } from 'react-icons/fa';

const achievements = [
  {
    icon: FaChartLine,
    title: "7+ Years Experience",
    description: "Extensive expertise in investing and trading in Indian markets"
  },
  {
    icon: FaUserGraduate,
    title: "AMFI Registered",
    description: "Certified Mutual Fund Advisor with deep understanding of market dynamics"
  },
  {
    icon: FaHandshake,
    title: "1000+ Satisfied Clients",
    description: "Helping investors achieve their financial goals through expert guidance"
  },
  {
    icon: FaAward,
    title: "₹10Cr+ Portfolio",
    description: "Successfully managing mutual fund investments worth over 10 Crores"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Learn From Us?</h2>
          <p className="text-xl text-gray-600">
            Expert guidance from Kerala's leading finance educator
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
              <achievement.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 mb-4">Trusted by professionals across Kerala</p>
          <div className="flex justify-center items-center gap-8 text-gray-400">
            <span className="text-xl font-semibold">AMFI Registered</span>
            <span>•</span>
            <span className="text-xl font-semibold">NISM Certified</span>
            <span>•</span>
            <span className="text-xl font-semibold">Marketvisa Co-founder</span>
          </div>
        </div>
      </div>
    </section>
  );
} 