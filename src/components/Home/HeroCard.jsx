'use client';

import { CalendarDays } from 'lucide-react';

/* ─── Bintang dekoratif ─── */
const STARS = [
  { top: '12%', left: '15%', size: 2, delay: '0s'   },
  { top: '20%', left: '75%', size: 3, delay: '0.7s' },
  { top: '35%', left: '88%', size: 2, delay: '1.3s' },
  { top: '55%', left: '8%',  size: 2, delay: '0.4s' },
  { top: '65%', left: '60%', size: 1.5, delay: '1s' },
  { top: '80%', left: '30%', size: 2, delay: '1.8s' },
  { top: '10%', left: '45%', size: 1.5, delay: '2s' },
];

export default function HeroCard({ hero, userCity, onOpenSchedule }) {
  if (!hero) {
    return (
      <div className='skeleton min-h-[300px] md:min-h-[320px] lg:min-h-[340px] rounded-[2.5rem]' />
    );
  }

  return (
    <div
      className='relative min-h-[300px] md:min-h-[320px] lg:min-h-[340px] rounded-[2.5rem] p-7 md:p-9 lg:p-10 text-white overflow-hidden group transition-all duration-500 hover:-translate-y-1'
      style={{
        background: 'linear-gradient(135deg, #0f1f5c 0%, #1a0a4a 40%, #0a0f2e 100%)',
        boxShadow: '0 20px 60px rgba(10,15,46,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      {/* ── Ambient light ── */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(90,120,255,0.25) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(120,40,200,0.2) 0%, transparent 55%)',
        }}
      />

      {/* ── Bintang-bintang ── */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className='absolute rounded-full bg-white pointer-events-none'
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: 0.6,
            animation: `starTwinkle 3s ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        />
      ))}

      {/* ── Crescent moon silhouette ── */}
      <div
        className='absolute -bottom-10 -right-10 w-52 h-52 rounded-full pointer-events-none opacity-[0.07]'
        style={{ background: 'white', filter: 'blur(1px)' }}
      />
      <div
        className='absolute -bottom-6 -right-6 w-44 h-44 rounded-full pointer-events-none'
        style={{ background: '#0f1f5c', filter: 'blur(0px)' }}
      />

      {/* ── Top bar ── */}
      <div className='relative z-10 flex justify-between items-center'>
        <div
          className='flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10'
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}
        >
          <span className='text-[10px] md:text-xs uppercase tracking-widest font-bold text-amber-300'>
            {userCity}
          </span>
        </div>

        <button
          onClick={onOpenSchedule}
          className='p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors'
          style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
        >
          <CalendarDays size={18} className='text-white/80' />
        </button>
      </div>

      {/* ── Center content ── */}
      <div className='relative z-10 text-center mt-7 md:mt-9 lg:mt-10'>
        <p className='text-[10px] md:text-xs uppercase tracking-[0.3em] text-amber-300/80 mb-2.5'>
          {hero.countdownLabel || hero.label}
        </p>

        {hero.timeLeft ? (
          <h2
            className='text-[4rem] md:text-[4.5rem] lg:text-[5.5rem] font-extrabold tracking-[-0.05em] tabular-nums leading-none'
            style={{
              background: 'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.55) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(180,200,255,0.5))',
            }}
          >
            {hero.timeLeft}
          </h2>
        ) : (
          <h2
            className='text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-extrabold leading-tight mt-4'
            style={{
              background: 'linear-gradient(180deg, #ffffff 30%, rgba(255,255,255,0.55) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {hero.label}
          </h2>
        )}

        <p className='mt-3 text-sm md:text-base text-white/60'>
          {hero.sublabel}
        </p>
      </div>

      {/* ── Progress bar ── */}
      {hero.progress && (
        <div className='relative z-10 mt-10 md:mt-12 max-w-2xl mx-auto'>
          <div className='flex justify-between text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 mb-2'>
            <span>{hero.progress.startLabel}</span>
            <span>{hero.progress.endLabel}</span>
          </div>
          <div className='relative h-2 w-full rounded-full overflow-hidden' style={{ background: 'rgba(255,255,255,0.08)' }}>
            <div
              className='h-full rounded-full transition-all duration-1000 ease-out'
              style={{
                width: `${hero.progress.value}%`,
                background: 'linear-gradient(90deg, #818cf8, #a78bfa, #c4b5fd)',
                boxShadow: '0 0 14px rgba(167,139,250,0.7)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
