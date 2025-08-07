'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Home,
  GraduationCap,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Generus',
    href: '/generus',
    icon: Users,
  },
  {
    name: 'TPQ Desa',
    href: '/tpq-desa',
    icon: GraduationCap,
    levels: [
      'Paket C',
      'Paket D',
    ],
  },
  {
    name: 'TPQ Jatilama',
    href: '/tpq-jatilama',
    icon: GraduationCap,
    levels: [
      'Pra PAUD',
      'PAUD',
      'Paket A1',
      'Paket A2',
      'Paket B',
    ],
  },
  {
    name: 'TPQ Jatibaru',
    href: '/tpq-jatibaru',
    icon: GraduationCap,
    levels: [
      'Pra PAUD',
      'PAUD',
      'Paket A1',
      'Paket A2',
      'Paket B',
    ],
  },
  {
    name: 'TPQ Bumimas',
    href: '/tpq-bumimas',
    icon: GraduationCap,
    levels: [
      'Pra PAUD',
      'PAUD',
      'Paket A1',
      'Paket A2',
      'Paket B',
    ],
  },
  {
    name: 'TPQ Rawacana',
    href: '/tpq-rawacana',
    icon: GraduationCap,
    levels: [
      'Pra PAUD',
      'PAUD',
      'Paket A1',
      'Paket A2',
      'Paket B',
    ],
  },
];

import { useState } from 'react';
import { useEffect } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openTPQ, setOpenTPQ] = useState<string | null>(null);

  // Reset TPQ state when navigating to non-TPQ pages
  useEffect(() => {
    const currentPage = navigation.find(item => item.href === pathname);
    if (currentPage && !currentPage.levels) {
      setOpenTPQ(null);
    }
  }, [pathname]);

  const handleTPQClick = (item: any) => {
    if (openTPQ === item.name) {
      setOpenTPQ(null);
    } else {
      setOpenTPQ(item.name);
    }
    // Always navigate to TPQ page for better UX
    router.push(item.href);
  };

  const handleMenuClick = (href: string) => {
    // Reset TPQ state when navigating to non-TPQ pages
    setOpenTPQ(null);
    // Always navigate for smooth UX, even if on same page
    router.push(href);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">TPQ Dashboard</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isTPQ = !!item.levels;
          const isActive = pathname === item.href;
          const isOpen = isTPQ && openTPQ === item.name;
          return (
            <div key={item.name}>
              {isTPQ ? (
                <button
                  type="button"
                  onClick={() => handleTPQClick(item)}
                  className={cn(
                    'w-full text-left group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    (isActive || isOpen)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      (isActive || isOpen) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    )}
                  />
                  {item.name}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleMenuClick(item.href)}
                  className={cn(
                    'w-full text-left group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    )}
                  />
                  {item.name}
                </button>
              )}
              {/* Collapsible submenu for TPQ dihilangkan */}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-600"></div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin TPQ</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
