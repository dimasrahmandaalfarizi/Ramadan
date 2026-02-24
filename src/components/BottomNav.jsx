'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, BookOpen, CalendarDays, MessageCircle, User } from 'lucide-react';

const NAV_ITEMS = [
  {
    path: '/',
    icon: Home,
    label: 'Beranda',
    exact: true,
  },
  {
    path: '/quran',
    icon: BookOpen,
    label: "Al-Qur'an",
    exact: false,
  },
  {
    path: '/tracker-kalender',
    icon: CalendarDays,
    label: 'Tracker',
    exact: false,
  },
  {
    path: '/ramatalk',
    icon: MessageCircle,
    label: 'RamaTalk',
    exact: false,
  },
  {
    path: '/user',
    icon: User,
    label: 'Profil',
    exact: false,
  },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (item) => {
    if (item.exact) return pathname === item.path;
    return pathname === item.path || pathname?.startsWith(item.path + '/');
  };

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-[100] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-700/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]'>
      <div className='flex items-stretch justify-around max-w-lg mx-auto'>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 flex-1
                transition-all duration-200 ease-out select-none min-h-[56px]
                ${active ? 'text-[#1e3a8a] dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}
                active:scale-90
              `}
              aria-label={item.label}
            >
              {/* Active indicator pill */}
              {active && (
                <span className='absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#1e3a8a] dark:bg-blue-400 rounded-full' />
              )}

              {/* Icon with animated background */}
              <span
                className={`
                  relative flex items-center justify-center w-9 h-7 rounded-xl transition-all duration-200
                  ${active ? 'bg-blue-100 dark:bg-blue-900/40' : ''}
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.5 : 2}
                  className='transition-all duration-200'
                />
              </span>

              {/* Label */}
              <span
                className={`text-[10px] font-semibold leading-none tracking-tight transition-all duration-200 ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
