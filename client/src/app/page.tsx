import Link from 'next/link';
import { FaRocket, FaLightbulb, FaRobot } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)] py-8 px-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 neon-text">
          Welcome to Sonic Agent Academy
        </h1>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-400">
          Your gateway to mastering Sonic blockchain technology through interactive, 
          AI-powered learning experiences.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: FaRocket,
              title: 'Interactive Learning',
              description: 'Learn by doing with hands-on exercises'
            },
            {
              icon: FaLightbulb,
              title: 'Earn Achievements',
              description: 'Track your progress with badges and rewards'
            },
            {
              icon: FaRobot,
              title: 'AI-Powered',
              description: 'Get personalized guidance from AI tutors'
            }
          ].map((feature, index) => (
            <div key={index} className="cyber-box p-6 flex flex-col items-center">
              <feature.icon className="w-8 h-8 mb-4 text-[rgb(var(--neon-primary))]" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <Link 
          href="/lessons" 
          className="neon-button px-8 py-4 rounded-lg font-semibold text-lg inline-block"
        >
          Begin Your Adventure
        </Link>
      </div>
    </div>
  );
}