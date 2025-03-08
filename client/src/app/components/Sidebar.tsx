'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaGraduationCap, FaRobot, FaTrophy } from 'react-icons/fa';

const navItems = [
  { name: 'Home', path: '/', icon: FaHome },
  { name: 'Lessons', path: '/lessons', icon: FaGraduationCap },
  { name: 'AI Builder', path: '/ai-builder', icon: FaRobot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[rgb(var(--surface-darker))] p-5 border-r border-[rgba(var(--neon-primary),0.1)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold neon-text">Sonic Academy</h1>
      </div>
      
      {/* User Progress Section */}
      {/* <div className="mb-8 cyber-box p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-[rgba(var(--neon-primary),0.1)] 
                        border border-[rgba(var(--neon-primary),0.3)] flex items-center justify-center">
            <span className="text-[rgb(var(--neon-primary))]">Lvl 1</span>
          </div>
          <div>
            <p className="text-sm text-gray-400">Progress</p>
            <div className="progress-bar w-full h-2 mt-1">
              <div className="progress-bar-fill h-full w-[30%]"></div>
            </div>
          </div>
        </div>
      </div> */}
      
      <nav className="mb-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? 'neon-button'
                    : 'hover:bg-[rgba(var(--neon-primary),0.1)]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Achievement Badge */}
      <div className="mt-4 p-4 cyber-box">
        <h3 className="text-sm text-gray-400 mb-2">Latest Achievement</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[rgba(var(--neon-secondary),0.2)] 
                        border border-[rgba(var(--neon-secondary),0.3)] flex items-center justify-center">
            <FaTrophy className="text-[rgb(var(--neon-secondary))]" />
          </div>
          <div>
            <p className="text-sm font-medium">First Step</p>
            <p className="text-xs text-gray-500">Started your journey</p>
          </div>
        </div>
      </div>
    </aside>
  );
}