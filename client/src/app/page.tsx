'use client';

import { useState } from 'react';
import { FaRocket, FaLightbulb, FaRobot, FaChevronRight, FaTimes } from 'react-icons/fa';


type UserData = {
  ageGroup: string;
  learningStyle: string;
  experienceLevel: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(userData));
    // Navigate to lessons page
    window.location.href = '/lessons';
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-2rem)] py-10 px-4 mt-[50px]">
      {/* Hero Section */}
      <div className="max-w-4xl w-full mx-auto text-center mb-16 mt-8">
        <h1 className="text-5xl font-bold mb-4 neon-text tracking-tight">
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
                <feature.icon />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
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
          href="/lessons"
          onClick={handleOpenModal}
          className="neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2"
        >
          Begin Your Adventure
          <FaChevronRight />
        </a>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="cyber-box w-full max-w-md relative overflow-hidden backdrop-blur-md" style={{
            background: "rgba(20, 21, 32, 0.85)"
          }}>
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-white z-10"
            >
              <FaTimes size={20} />
            </button>

            {/* Background grid effect */}
            <div className="absolute inset-0 bg-grid opacity-20"></div>

            {/* Header */}
            <div className="border-b border-[rgba(var(--neon-primary),0.3)] px-6 py-4">
              <h2 className="text-xl font-bold neon-text text-center tracking-wide">Prepare for Launch: Tell Us About Your Mission</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Age Group */}
              <div>
                <label className="block font-medium neon-text mb-3 text-base">Which crew are you joining?</label>
                <div className="space-y-2">
                  {[
                    "Young Explorers (Under 18)",
                    "Rising Stars (18-25)",
                    "Seasoned Voyagers (26-35)",
                    "Master Navigators (36+)"
                  ].map((option) => (
                    <label key={option} className="flex items-center cyber-box p-2 hover:border-[rgba(var(--neon-primary),0.7)] cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="ageGroup"
                        value={option}
                        className="mr-3 accent-[rgb(var(--neon-primary))]"
                        required
                        onChange={handleChange}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Learning Style */}
              <div>
                <label className="block font-medium neon-text mb-3 text-base">What&apos;s your learning superpower?</label>
                <div className="space-y-2">
                  {[
                    { label: "I see it to believe it (Visual) (coming soon)", disabled: true },
                    { label: "I hear you loud and clear (Auditory) (coming soon)", disabled: true },
                    { label: "I learn by doing (Kinesthetic) (coming soon)", disabled: true },
                    { label: "I read and write my way to knowledge (Reading/Writing)", disabled: false }
                  ].map((option) => (
                    <label
                      key={option.label}
                      className={`flex items-center cyber-box p-2 ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[rgba(var(--neon-primary),0.7)] cursor-pointer'} transition-all`}
                    >
                      <input
                        type="radio"
                        name="learningStyle"
                        value={option.label}
                        disabled={option.disabled}
                        className="mr-3 accent-[rgb(var(--neon-primary))]"
                        required={!option.disabled}
                        onChange={handleChange}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="block font-medium neon-text mb-3 text-base">How familiar are you with the Sonic universe?</label>
                <div className="space-y-2">
                  {[
                    "New to the galaxy (Beginner)",
                    "I've orbited a few planets (Intermediate)",
                    "I'm a seasoned space captain (Advanced)"
                  ].map((option) => (
                    <label key={option} className="flex items-center cyber-box p-2 hover:border-[rgba(var(--neon-primary),0.7)] cursor-pointer transition-all">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={option}
                        className="mr-3 accent-[rgb(var(--neon-primary))]"
                        required
                        onChange={handleChange}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="neon-button w-full py-3 rounded-md font-semibold text-base inline-flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <FaChevronRight />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}