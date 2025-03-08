import Link from 'next/link';
import { FaRocket, FaLightbulb, FaRobot, FaChevronRight } from 'react-icons/fa';

export default function Home() {
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
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-2rem)] py-10 px-4">
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
      <div className="max-w-4xl w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 place-items-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="cyber-box p-6 flex flex-col items-center h-full max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(var(--neon-primary),0.1)] border border-[rgba(var(--neon-primary),0.3)] mb-4">
                <feature.icon className="w-6 h-6 text-[rgb(var(--neon-primary))]" />
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
        <Link
          href="/lessons"
          className="neon-button px-8 py-3 rounded-lg font-semibold text-base inline-flex items-center gap-2"
        >
          Begin Your Adventure
          <FaChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
