'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GraduationCap, Bot } from 'lucide-react';
import { cn } from '../utils/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Lessons', path: '/lessons', icon: GraduationCap },
  { name: 'AI Builder', path: '/ai-builder', icon: Bot },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="group w-84 border-r bg-background px-4 py-6 bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="mb-6 px-2">
        <h1 className="text-2xl font-bold text-white">Sonic Academy</h1>
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
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground w-full cursor-pointer",
              pathname === item.path ? 
                "bg-primary text-primary-foreground" : 
                "transparent"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0 text-white" />
            <span className="truncate text-white">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* <div className="mt-4 p-4 cyber-box">
        <h3 className="text-sm text-gray-400 mb-2">Latest Achievement</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[rgba(var(--neon-secondary),0.2)] 
                        border border-[rgba(var(--neon-secondary),0.3)] flex items-center justify-center">
            <FaTrophy/>
          </div>
          <div>
            <p className="text-sm font-medium">First Step</p>
            <p className="text-xs text-gray-500">Started your journey</p>
          </div>
        </div>
      </div> */}
    </aside>
  );
}