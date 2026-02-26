'use client';

import { CheckCircle2, ChevronRight } from 'lucide-react';

const DailyGoalTracker = ({ taskProgress, onClick }) => {
  const progressPercent =
    taskProgress.total === 0
      ? 0
      : Math.round((taskProgress.completed / taskProgress.total) * 100);

  const isComplete = progressPercent === 100;

  return (
    <div
      onClick={onClick}
      className='card-lift-dark relative rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer'
      style={{
        background: isComplete
          ? 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)'
          : 'linear-gradient(135deg, #0e2a1a 0%, #0a3d29 50%, #064e3b 100%)',
        boxShadow: isComplete
          ? '0 10px 40px rgba(5,150,105,0.4)'
          : '0 8px 32px rgba(6,78,59,0.4)',
        border: '1px solid rgba(52,211,153,0.12)',
      }}
    >
      {/* Ambient top-right glow */}
      <div
        className='absolute top-0 right-0 w-36 h-36 rounded-full pointer-events-none transition-opacity duration-500'
        style={{
          background: 'radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%)',
          transform: 'translate(35%, -35%)',
          opacity: isComplete ? 1 : 0.6,
        }}
      />

      {/* SVG hex grid decoration */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='hex' x='0' y='0' width='40' height='46' patternUnits='userSpaceOnUse'>
            <polygon points='20,2 38,12 38,34 20,44 2,34 2,12' fill='none' stroke='white' strokeWidth='1' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#hex)' />
      </svg>

      {/* Header row */}
      <div className='relative z-10 flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <span className='w-8 h-8 rounded-xl flex items-center justify-center' style={{ background: 'rgba(52,211,153,0.2)' }}>
            <CheckCircle2 size={16} className='text-emerald-300' />
          </span>
          <span className='text-[10px] uppercase tracking-widest font-bold text-emerald-300/70'>
            Ibadah Harian
          </span>
        </div>

        {/* Circular progress */}
        <div className='relative w-12 h-12 flex items-center justify-center'>
          <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
            <circle cx='18' cy='18' r='15.5' fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='3' />
            <circle
              cx='18' cy='18' r='15.5' fill='none'
              stroke={isComplete ? '#34d399' : '#6ee7b7'}
              strokeWidth='3'
              strokeLinecap='round'
              strokeDasharray={`${progressPercent}, 100`}
              style={{ transition: 'stroke-dasharray 1s ease-out', filter: isComplete ? 'drop-shadow(0 0 6px #34d399)' : 'none' }}
            />
          </svg>
          <span className='absolute text-[10px] font-black text-white tabular-nums'>{progressPercent}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className='relative z-10 mb-3'>
        <div className='h-1.5 w-full rounded-full overflow-hidden' style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div
            className='h-full rounded-full transition-all duration-1000 ease-out'
            style={{
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #34d399, #10b981)',
              boxShadow: '0 0 10px rgba(52,211,153,0.5)',
            }}
          />
        </div>
      </div>

      {/* Stats + arrow */}
      <div className='relative z-10 flex justify-between items-center'>
        <p className='text-sm text-emerald-100/60 font-medium'>
          <span className='text-white font-bold'>{taskProgress.completed}</span>
          <span className='mx-1'>/</span>
          {taskProgress.total} target selesai
        </p>
        <span className='flex items-center gap-0.5 text-xs font-semibold text-emerald-300/60 group-hover:text-emerald-300 transition-colors'>
          Detail <ChevronRight size={13} className='group-hover:translate-x-0.5 transition-transform' />
        </span>
      </div>
    </div>
  );
};

export default DailyGoalTracker;
