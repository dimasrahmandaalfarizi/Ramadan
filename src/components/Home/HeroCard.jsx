'use client';

import { CalendarDays } from 'lucide-react';

/* ─── Dekorasi bintang ─── */
const STARS = [
  { top: '10%', left: '10%', size: 2.5, delay: '0s' },
  { top: '18%', left: '72%', size: 3,   delay: '0.8s' },
  { top: '40%', left: '90%', size: 2,   delay: '1.5s' },
  { top: '60%', left: '5%',  size: 2,   delay: '0.3s' },
  { top: '75%', left: '55%', size: 1.5, delay: '1.1s' },
  { top: '85%', left: '28%', size: 2,   delay: '2s' },
  { top: '8%',  left: '42%', size: 1.5, delay: '1.7s' },
  { top: '50%', left: '78%', size: 2,   delay: '0.6s' },
];

// Mode → warna accent & gradient
const MODE_STYLES = {
  berbuka: {
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 30%, #1a0533 100%)',
    glow: 'radial-gradient(ellipse at 25% 20%, rgba(251,146,60,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(139,0,90,0.25) 0%, transparent 55%)',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.15)',
  },
  tarawih: {
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #0f1f5c 100%)',
    glow: 'radial-gradient(ellipse at 30% 20%, rgba(139,92,246,0.3) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(67,56,202,0.25) 0%, transparent 55%)',
    accent: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.15)',
  },
  tahajud: {
    gradient: 'linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)',
    glow: 'radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.2) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(15,23,42,0.4) 0%, transparent 55%)',
    accent: '#818cf8',
    accentBg: 'rgba(129,140,248,0.12)',
  },
  'puasa-dimulai': {
    gradient: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #1a0f00 100%)',
    glow: 'radial-gradient(ellipse at 30% 20%, rgba(251,146,60,0.25) 0%, transparent 55%), radial-gradient(ellipse at 75% 80%, rgba(120,53,15,0.3) 0%, transparent 55%)',
    accent: '#fcd34d',
    accentBg: 'rgba(252,211,77,0.15)',
  },
  buka: {
    gradient: 'linear-gradient(135deg, #0f1f5c 0%, #1a0a4a 45%, #0a0f2e 100%)',
    glow: 'radial-gradient(ellipse at 30% 20%, rgba(90,120,255,0.28) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(120,40,200,0.22) 0%, transparent 55%)',
    accent: '#fbbf24',
    accentBg: 'rgba(251,191,36,0.12)',
  },
};

export default function HeroCard({ hero, userCity, onOpenSchedule }) {
  if (!hero) {
    return <div className='skeleton min-h-[288px] md:min-h-[320px] rounded-[2.5rem]' />;
  }

  const style = MODE_STYLES[hero.mode] || MODE_STYLES.buka;

  return (
    <div
      className='card-lift-dark relative min-h-[288px] md:min-h-[320px] lg:min-h-[340px] rounded-[2.5rem] p-6 md:p-8 lg:p-9 overflow-hidden'
      style={{
        background: style.gradient,
        boxShadow: '0 24px 64px rgba(5,10,40,0.55), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* Ambient glow */}
      <div className='absolute inset-0 pointer-events-none' style={{ background: style.glow }} />

      {/* Islamic geometric pattern (SVG) */}
      <svg
        className='absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <pattern id='geo' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'>
            <path d='M30 0 L60 15 L60 45 L30 60 L0 45 L0 15 Z' fill='none' stroke='white' strokeWidth='0.8' />
            <path d='M30 10 L50 20 L50 40 L30 50 L10 40 L10 20 Z' fill='none' stroke='white' strokeWidth='0.5' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#geo)' />
      </svg>

      {/* Crescent moon deco */}
      <div className='absolute -bottom-12 -right-12 w-56 h-56 rounded-full pointer-events-none opacity-[0.06]'
        style={{ background: 'white', filter: 'blur(2px)' }} />
      <div className='absolute -bottom-8 -right-8 w-48 h-48 rounded-full pointer-events-none'
        style={{ background: style.gradient }} />

      {/* Stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className='absolute rounded-full bg-white pointer-events-none'
          style={{
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            opacity: 0.55,
            animation: 'starTwinkle 3s ease-in-out infinite',
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* ── Top bar ── */}
      <div className='relative z-10 flex justify-between items-center'>
        {/* City badge */}
        <div
          className='flex items-center gap-2 px-3 py-1.5 rounded-full'
          style={{ background: style.accentBg, border: `1px solid ${style.accent}25` }}
        >
          <span className='w-1.5 h-1.5 rounded-full animate-pulse' style={{ background: style.accent }} />
          <span className='text-[10px] md:text-xs uppercase tracking-widest font-bold' style={{ color: style.accent }}>
            {userCity}
          </span>
        </div>

        {/* Schedule button */}
        <button
          onClick={onOpenSchedule}
          className='p-2.5 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200'
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
          aria-label='Jadwal Sholat'
        >
          <CalendarDays size={17} className='text-white/70' />
        </button>
      </div>

      {/* ── Center content ── */}
      <div className='relative z-10 text-center mt-6 md:mt-8'>
        <p className='text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-3' style={{ color: `${style.accent}bb` }}>
          {hero.countdownLabel || hero.label}
        </p>

        {hero.timeLeft ? (
          <h2
            className='text-[3.8rem] md:text-[4.5rem] lg:text-[5.5rem] font-black tracking-[-0.05em] tabular-nums leading-none'
            style={{
              background: `linear-gradient(180deg, #ffffff 20%, ${style.accent}88 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 24px rgba(180,200,255,0.4))',
            }}
          >
            {hero.timeLeft}
          </h2>
        ) : (
          <h2
            className='text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black leading-tight mt-3'
            style={{
              background: `linear-gradient(180deg, #ffffff 30%, ${style.accent}99 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {hero.label}
          </h2>
        )}

        <p className='mt-3 text-sm md:text-base text-white/50 font-medium'>{hero.sublabel}</p>
      </div>

      {/* ── Progress bar ── */}
      {hero.progress && (
        <div className='relative z-10 mt-8 md:mt-10 max-w-lg mx-auto'>
          <div className='flex justify-between text-[9px] uppercase tracking-widest text-white/35 mb-2'>
            <span>{hero.progress.startLabel}</span>
            <span className='font-bold' style={{ color: `${style.accent}88` }}>
              {Math.round(hero.progress.value)}%
            </span>
            <span>{hero.progress.endLabel}</span>
          </div>
          <div className='relative h-1.5 w-full rounded-full overflow-hidden' style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className='h-full rounded-full transition-all duration-1000 ease-out'
              style={{
                width: `${hero.progress.value}%`,
                background: `linear-gradient(90deg, ${style.accent}88, ${style.accent})`,
                boxShadow: `0 0 12px ${style.accent}66`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
