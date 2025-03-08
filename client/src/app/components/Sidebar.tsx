'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Lessons', href: '/lessons' },
    { name: 'AI Builder', href: '/ai-builder' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800">
            <div className="flex h-16 items-center px-6">
                <h1 className="text-xl font-bold text-mint-500">Sonic Agent Academy</h1>
            </div>
            <nav className="px-3 mt-6">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-3 py-2 rounded-lg mb-2 transition-colors ${
                                isActive
                                    ? 'bg-mint-500/10 text-mint-500'
                                    : 'text-gray-400 hover:bg-mint-500/10 hover:text-mint-500'
                            }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}