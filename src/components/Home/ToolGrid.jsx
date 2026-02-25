'use client';

import { useRouter } from 'next/navigation';
import {
  BookOpenCheck,
  Sparkles,
  Library,
  Gavel,
  Navigation,
  Infinity,
  Coins,
  Moon,
} from 'lucide-react';

const TOOLS = [
  {
    icon: BookOpenCheck,
    arabic: 'القُرْآن',
    title: "Al-Qur'an",
    gradient: 'linear-gradient(145deg, #1e3a8a 0%, #2563eb 100%)',
    glow: 'rgba(30,58,138,0.45)',
    route: '/quran',
  },
  {
    icon: Sparkles,
    arabic: 'دُعَاء',
    title: 'Doa',
    gradient: 'linear-gradient(145deg, #9f1239 0%, #e11d48 100%)',
    glow: 'rgba(225,29,72,0.4)',
    route: '/doa',
  },
  {
    icon: Library,
    arabic: 'حَدِيث',
    title: 'Hadits',
    gradient: 'linear-gradient(145deg, #064e3b 0%, #10b981 100%)',
    glow: 'rgba(16,185,129,0.4)',
    route: '/hadits',
  },
  {
    icon: Gavel,
    arabic: 'فِقْه',
    title: 'Fiqih',
    gradient: 'linear-gradient(145deg, #78350f 0%, #f59e0b 100%)',
    glow: 'rgba(245,158,11,0.4)',
    route: '/fiqih',
  },
  {
    icon: Navigation,
    arabic: 'قِبْلَة',
    title: 'Kiblat',
    gradient: 'linear-gradient(145deg, #1e1b4b 0%, #6366f1 100%)',
    glow: 'rgba(99,102,241,0.4)',
    route: '/kompas',
  },
  {
    icon: Infinity,
    arabic: 'تَسْبِيح',
    title: 'Tasbih',
    gradient: 'linear-gradient(145deg, #134e4a 0%, #2dd4bf 100%)',
    glow: 'rgba(45,212,191,0.4)',
    route: '/tasbih',
  },
  {
    icon: Coins,
    arabic: 'زَكَاة',
    title: 'Zakat',
    gradient: 'linear-gradient(145deg, #451a03 0%, #eab308 100%)',
    glow: 'rgba(234,179,8,0.4)',
    route: '/zakat',
  },
  {
    icon: Moon,
    arabic: 'طَهَارَة',
    title: 'Haid',
    gradient: 'linear-gradient(145deg, #831843 0%, #f472b6 100%)',
    glow: 'rgba(244,114,182,0.4)',
    route: '/haid-tracker',
  },
];

const ToolGrid = () => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-4 md:grid-cols-8 lg:grid-cols-4 gap-3 mt-1'>
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.route}
            onClick={() => router.push(tool.route)}
            className='flex flex-col items-center gap-2 group active:scale-90 transition-transform duration-150'
          >
            {/* Card */}
            <span
              className='w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden'
              style={{
                background: tool.gradient,
                boxShadow: `0 4px 16px ${tool.glow}`,
              }}
            >
              {/* Decorative glow blob */}
              <span
                className='absolute rounded-full opacity-20 blur-md'
                style={{
                  width: '60%',
                  height: '60%',
                  background: 'white',
                  top: '-20%',
                  right: '-15%',
                }}
              />

              {/* Lucide icon – small, top area */}
              <Icon
                size={16}
                strokeWidth={1.8}
                className='text-white/80 drop-shadow-sm relative z-10'
              />

              {/* Arabic text – main visual */}
              <span
                className='text-white relative z-10 leading-none select-none'
                style={{
                  fontFamily: '"Amiri", "Scheherazade New", "Noto Naskh Arabic", serif',
                  fontSize: 'clamp(11px, 3vw, 15px)',
                  textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  fontWeight: 700,
                }}
              >
                {tool.arabic}
              </span>
            </span>

            {/* Label */}
            <span className='text-[11px] font-semibold text-slate-600 dark:text-slate-400 text-center leading-tight'>
              {tool.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToolGrid;
