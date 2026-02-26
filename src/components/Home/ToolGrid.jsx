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
    gradient: 'var(--tool-quran)',
    shadow:   'var(--tool-shadow-quran)',
    route: '/quran',
  },
  {
    icon: Sparkles,
    arabic: 'دُعَاء',
    title: 'Doa',
    gradient: 'var(--tool-doa)',
    shadow:   'var(--tool-shadow-doa)',
    route: '/doa',
  },
  {
    icon: Library,
    arabic: 'حَدِيث',
    title: 'Hadits',
    gradient: 'var(--tool-hadits)',
    shadow:   'var(--tool-shadow-hadits)',
    route: '/hadits',
  },
  {
    icon: Gavel,
    arabic: 'فِقْه',
    title: 'Fiqih',
    gradient: 'var(--tool-fiqih)',
    shadow:   'var(--tool-shadow-fiqih)',
    route: '/fiqih',
  },
  {
    icon: Navigation,
    arabic: 'قِبْلَة',
    title: 'Kiblat',
    gradient: 'var(--tool-kiblat)',
    shadow:   'var(--tool-shadow-kiblat)',
    route: '/kompas',
  },
  {
    icon: Infinity,
    arabic: 'تَسْبِيح',
    title: 'Tasbih',
    gradient: 'var(--tool-tasbih)',
    shadow:   'var(--tool-shadow-tasbih)',
    route: '/tasbih',
  },
  {
    icon: Coins,
    arabic: 'زَكَاة',
    title: 'Zakat',
    gradient: 'var(--tool-zakat)',
    shadow:   'var(--tool-shadow-zakat)',
    route: '/zakat',
  },
  {
    icon: Moon,
    arabic: 'طَهَارَة',
    title: 'Haid',
    gradient: 'var(--tool-haid)',
    shadow:   'var(--tool-shadow-haid)',
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
