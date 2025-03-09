'use client';

import { useState } from 'react';
import { FaRocket, FaLightbulb, FaRobot, FaChevronRight } from 'react-icons/fa';
import OnBoardingModal from './components/OnBoardingModal';

export default function Home() {
  const [isOnBoardingModalOpen, setIsOnBoardingModalOpen] = useState(false);

  const features = [
    {
      icon: FaRocket,
      title: 'Interactive Learning',
      description: 'Learn by doing with hands-on exercises',
    },
    {
      icon: FaLightbulb,
      title: 'Earn Achievements',
      description: 'Track your progress with badges and rewards',
    },
    {
      icon: FaRobot,
      title: 'AI-Powered',
      description: 'Get personalized guidance from AI tutors',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 bg-gradient-to-b from-gray-900 to-black">

      {/* Hero Section */}
      <div className="max-w-4xl w-full mx-auto text-center mb-16 mt-8">
        <h1 className="text-5xl font-bold mb-4 neon-text tracking-tight text-white">
          Welcome to Sonic Agent Academy
        </h1>
        <p className="text-lg mb-0 max-w-2xl mx-auto text-gray-400 leading-relaxed">
          Your gateway to mastering Sonic blockchain technology through
          interactive, AI-powered learning experiences.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="max-w-[1200px] w-full mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 place-items-center text-white">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center 
                h-full w-full max-w-sm shadow-xl shadow-black/20 border border-white/10
                hover:bg-gray-800/90 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center 
                bg-blue-500/20 border border-blue-500/30 mb-6 
                shadow-lg shadow-blue-500/20">
                <feature.icon className="text-blue-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-base text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <a
          onClick={() => setIsOnBoardingModalOpen(true)}
          className="neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2 text-white cursor-pointer"
        >
          Begin Your Adventure
          <FaChevronRight />
        </a>
      </div>
      {/* Modal */}
      <OnBoardingModal
        isOpen={isOnBoardingModalOpen}
        onClose={() => setIsOnBoardingModalOpen(false)}
      />
    </div>
  );
}