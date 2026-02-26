'use client';

import { useStreak } from '@/hooks/useStreak';
import { Flame, Trophy, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const StreakCard = () => {
  const { streak, bestStreak, todayPercent, loading } = useStreak();
  const router = useRouter();

  if (loading) {
    return <div className='skeleton h-24 rounded-[2rem]' />;
  }

  const isOnFire = streak >= 3;

  return (
    <div
      onClick={() => router.push('/tracker-kalender')}
      className='card-lift relative rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer flex items-center gap-5'
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Accent bar */}
      <div
        className='absolute top-4 bottom-4 left-0 w-1 rounded-r-full'
        style={{ background: isOnFire ? 'linear-gradient(180deg,#f59e0b,#ef4444)' : 'linear-gradient(180deg,#94a3b8,#64748b)' }}
      />

      {/* Icon */}
      <div
        className='w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center'
        style={{
          background: isOnFire
            ? 'linear-gradient(135deg,#7c2d12,#b45309)'
            : 'var(--bg-subtle)',
          boxShadow: isOnFire ? '0 4px 16px rgba(245,158,11,0.35)' : 'none',
        }}
      >
        <Flame
          size={28}
          className={isOnFire ? 'text-amber-300' : 'text-slate-400 dark:text-slate-500'}
          fill={isOnFire ? 'currentColor' : 'none'}
        />
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0 pl-2'>
        <div className='flex items-center gap-2 mb-1'>
          <span className='text-[10px] uppercase tracking-widest font-bold' style={{ color: 'var(--text-muted)' }}>
            Streak Ibadah
          </span>
        </div>

        <div className='flex items-baseline gap-2'>
          <span
            className='text-3xl font-black tabular-nums'
            style={{ color: isOnFire ? '#f59e0b' : 'var(--text-primary)' }}
          >
            {streak}
          </span>
          <span className='text-sm font-semibold' style={{ color: 'var(--text-muted)' }}>
            hari berturut
          </span>
        </div>

        {/* Progress bar hari ini */}
        <div className='mt-2 flex items-center gap-2'>
          <div className='flex-1 h-1.5 rounded-full overflow-hidden' style={{ background: 'var(--bg-subtle)' }}>
            <div
              className='h-full rounded-full transition-all duration-700'
              style={{
                width: `${todayPercent}%`,
                background: isOnFire
                  ? 'linear-gradient(90deg,#f59e0b,#ef4444)'
                  : 'linear-gradient(90deg,#64748b,#94a3b8)',
              }}
            />
          </div>
          <span className='text-[10px] font-bold tabular-nums' style={{ color: 'var(--text-muted)' }}>
            {todayPercent}%
          </span>
        </div>
      </div>

      {/* Best streak badge */}
      <div className='shrink-0 flex flex-col items-center gap-1'>
        <div
          className='flex items-center gap-1 px-2 py-1 rounded-lg'
          style={{ background: 'var(--bg-subtle)' }}
        >
          <Trophy size={11} className='text-amber-500' />
          <span className='text-[10px] font-black tabular-nums' style={{ color: 'var(--text-secondary)' }}>
            {bestStreak}
          </span>
        </div>
        <span className='text-[8px] font-bold uppercase tracking-wide' style={{ color: 'var(--text-muted)' }}>
          Terbaik
        </span>
        <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
      </div>
    </div>
  );
};

export default StreakCard;
