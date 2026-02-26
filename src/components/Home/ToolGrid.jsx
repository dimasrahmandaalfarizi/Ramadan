'use client';

import { useRouter } from 'next/navigation';
import {
  BookOpenCheck, Sparkles, Library, Gavel,
  Navigation, Infinity, Coins, Moon,
} from 'lucide-react';

const TOOLS = [
  {
    icon: BookOpenCheck,
    arabic: 'القُرْآن',
    title: "Al-Qur'an",
    gradient: 'linear-gradient(145deg, #1e3a8a 0%, #2563eb 100%)',
    glow: 'rgba(37,99,235,0.6)',
    shadow: '0 8px 24px rgba(37,99,235,0.45)',
    route: '/quran',
  },
  {
    icon: Sparkles,
    arabic: 'دُعَاء',
    title: 'Doa',
    gradient: 'linear-gradient(145deg, #881337 0%, #e11d48 100%)',
    glow: 'rgba(225,29,72,0.6)',
    shadow: '0 8px 24px rgba(225,29,72,0.45)',
    route: '/doa',
  },
  {
    icon: Library,
    arabic: 'حَدِيث',
    title: 'Hadits',
    gradient: 'linear-gradient(145deg, #064e3b 0%, #10b981 100%)',
    glow: 'rgba(16,185,129,0.55)',
    shadow: '0 8px 24px rgba(16,185,129,0.4)',
    route: '/hadits',
  },
  {
    icon: Gavel,
    arabic: 'فِقْه',
    title: 'Fiqih',
    gradient: 'linear-gradient(145deg, #78350f 0%, #f59e0b 100%)',
    glow: 'rgba(245,158,11,0.55)',
    shadow: '0 8px 24px rgba(245,158,11,0.4)',
    route: '/fiqih',
  },
  {
    icon: Navigation,
    arabic: 'قِبْلَة',
    title: 'Kiblat',
    gradient: 'linear-gradient(145deg, #1e1b4b 0%, #6366f1 100%)',
    glow: 'rgba(99,102,241,0.6)',
    shadow: '0 8px 24px rgba(99,102,241,0.45)',
    route: '/kompas',
  },
  {
    icon: Infinity,
    arabic: 'تَسْبِيح',
    title: 'Tasbih',
    gradient: 'linear-gradient(145deg, #134e4a 0%, #14b8a6 100%)',
    glow: 'rgba(20,184,166,0.55)',
    shadow: '0 8px 24px rgba(20,184,166,0.4)',
    route: '/tasbih',
  },
  {
    icon: Coins,
    arabic: 'زَكَاة',
    title: 'Zakat',
    gradient: 'linear-gradient(145deg, #713f12 0%, #eab308 100%)',
    glow: 'rgba(234,179,8,0.55)',
    shadow: '0 8px 24px rgba(234,179,8,0.4)',
    route: '/zakat',
  },
  {
    icon: Moon,
    arabic: 'طَهَارَة',
    title: 'Haid',
    gradient: 'linear-gradient(145deg, #831843 0%, #f472b6 100%)',
    glow: 'rgba(244,114,182,0.6)',
    shadow: '0 8px 24px rgba(244,114,182,0.45)',
    route: '/haid-tracker',
  },
];

const ToolGrid = () => {
  const router = useRouter();

  return (
    <div className='grid grid-cols-4 gap-3 md:gap-4'>
      {TOOLS.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.route}
            onClick={() => router.push(tool.route)}
            className='group flex flex-col items-center gap-2 focus:outline-none'
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* ── Card ── */}
            <span
              className='card-lift-dark relative w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 overflow-hidden ring-1 ring-transparent hover:ring-white/[0.14] transition-[box-shadow,ring-color] duration-[280ms]'
              style={{
                background: tool.gradient,
                boxShadow: tool.shadow,
              }}
            >
              {/* Shine diagonal — very subtle, luxury */}
              <span
                className='absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[280ms]'
                style={{
                  background: 'linear-gradient(130deg, rgba(255,255,255,0.10) 0%, transparent 50%)',
                }}
              />
              {/* Glow blob top-right */}
              <span
                className='absolute rounded-full blur-md pointer-events-none opacity-25'
                style={{ width: '55%', height: '55%', background: 'white', top: '-18%', right: '-12%' }}
              />

              {/* Icon */}
              <Icon size={15} strokeWidth={1.8} className='text-white/80 relative z-10' />

              {/* Arabic text */}
              <span
                className='text-white relative z-10 leading-none select-none font-bold'
                style={{
                  fontFamily: '"Amiri", "Scheherazade New", "Noto Naskh Arabic", serif',
                  fontSize: 'clamp(10px, 2.8vw, 14px)',
                  textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                }}
              >
                {tool.arabic}
              </span>
            </span>

            {/* Label */}
            <span
              className='text-[10px] md:text-[11px] font-semibold text-center leading-tight'
              style={{ color: 'var(--text-muted)' }}
            >
              {tool.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ToolGrid;
