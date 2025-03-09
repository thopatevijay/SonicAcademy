'use client';

import { useState } from 'react';
import { FaRocket, FaLightbulb, FaRobot, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import OnBoardingModal from './components/OnBoardingModal';

type UserData = {
  ageGroup: string;
  learningStyle: string;
  experienceLevel: string;
}

export default function Home() {
  const router = useRouter();
  const [isOnBoardingModalOpen, setIsOnBoardingModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    ageGroup: '',
    learningStyle: '',
    experienceLevel: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(userData));
    // Navigate to lessons page
    router.push('/lessons');
  };

  const handleOnBoardingSubmit = (agentData: { name: string; description: string }) => {
    console.log(agentData);
    localStorage.setItem('userData', JSON.stringify(userData));

    // Navigate to lessons page
    // router.push('/lessons');
  };

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
      <div className="max-w-[500px] w-full mx-auto mt-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 place-items-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="cyber-box p-6 flex flex-col items-center h-full max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(var(--neon-primary),0.1)] border border-[rgba(var(--neon-primary),0.3)] mb-4">
                <feature.icon className="text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm text-center">
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
          className="neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2 text-white"
        >
          Begin Your Adventure
          <FaChevronRight />
        </a>
      </div>

      {/* Modal */}

      <OnBoardingModal
        isOpen={isOnBoardingModalOpen}
        onClose={() => setIsOnBoardingModalOpen(false)}
        onSubmit={handleOnBoardingSubmit}
      />
    </div>
  );
}