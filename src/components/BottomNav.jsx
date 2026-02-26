'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, BookOpen, CalendarDays, User } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/',               icon: Home,          label: 'Beranda',   exact: true  },
  { path: '/quran',          icon: BookOpen,       label: "Al-Qur'an", exact: false },
  { path: '/tracker-kalender', icon: CalendarDays, label: 'Tracker',   exact: false },
  { path: '/user',           icon: User,           label: 'Profil',    exact: false },
];

export default function BottomNav() {
  const router   = useRouter();
  const pathname = usePathname();

  const isActive = (item) =>
    item.exact
      ? pathname === item.path
      : pathname === item.path || pathname?.startsWith(item.path + '/');

  return (
    <nav
      style={{
        background:    'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderTop:     '1px solid rgba(148,163,184,0.15)',
        boxShadow:     '0 -4px 24px rgba(30,58,138,0.07)',
      }}
      className='fixed bottom-0 left-0 right-0 z-[100] dark:!bg-[rgba(5,12,26,0.92)] dark:!border-t dark:![border-top-color:rgba(148,163,184,0.08)]'
    >
      <div className='flex items-stretch justify-around max-w-lg mx-auto'>
        {NAV_ITEMS.map((item) => {
          const Icon   = item.icon;
          const active = isActive(item);

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className='relative flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[60px] select-none active:scale-90 transition-transform duration-150'
              aria-label={item.label}
            >
              {/* Pill highlight for active tab */}
              <span
                className={`
                  flex items-center justify-center w-12 h-7 rounded-full mb-0.5
                  transition-all duration-300 ease-out
                  ${active
                    ? 'bg-gradient-to-br from-blue-600 to-[#1e3a8a] shadow-[0_2px_12px_rgba(30,58,138,0.4)]'
                    : 'bg-transparent'
                  }
                `}
              >
                <Icon
                  size={active ? 19 : 21}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={`transition-all duration-300 ${
                    active ? 'text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}
                />
              </span>

              {/* Label */}
              <span
                className={`text-[10px] font-semibold leading-none tracking-tight transition-all duration-300 ${
                  active
                    ? 'text-[#1e3a8a] dark:text-blue-400 opacity-100'
                    : 'text-slate-400 dark:text-slate-500 opacity-80'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Safe area for iOS home indicator */}
      <div className='h-safe-area-inset-bottom' />
    </nav>
  );
}
