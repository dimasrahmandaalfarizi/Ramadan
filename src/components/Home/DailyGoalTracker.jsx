'use client';

import { CheckSquare, ChevronRight } from 'lucide-react';

const DailyGoalTracker = ({ taskProgress, onClick }) => {
  const progressPercent =
    taskProgress.total === 0
      ? 0
      : Math.round((taskProgress.completed / taskProgress.total) * 100);

  return (
    <div
      onClick={onClick}
      className='relative rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:-translate-y-1'
      style={{
        background: 'linear-gradient(135deg, #065f46 0%, #047857 60%, #059669 100%)',
        boxShadow: '0 8px 32px rgba(5,150,105,0.3)',
      }}
    >
      {/* Ambient */}
      <div className='absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-20'
        style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

      <div className='relative z-10 flex justify-between items-center mb-4'>
        <div className='flex items-center gap-2'>
          <span className='p-2 rounded-xl bg-white/20 text-white'>
            <CheckSquare size={18} />
          </span>
          <span className='text-[10px] uppercase tracking-widest font-bold text-emerald-100/80'>
            Daily Goal
          </span>
        </div>

        {/* Circle progress */}
        <div className='relative w-12 h-12 flex items-center justify-center'>
          <svg className='w-full h-full -rotate-90' viewBox='0 0 36 36'>
            <circle cx='18' cy='18' r='15.9' fill='none' stroke='rgba(255,255,255,0.15)' strokeWidth='3.5' />
            <circle
              cx='18' cy='18' r='15.9' fill='none'
              stroke='white' strokeWidth='3.5'
              strokeLinecap='round'
              strokeDasharray={`${progressPercent}, 100`}
              style={{ transition: 'stroke-dasharray 1s ease-out' }}
            />
          </svg>
          <span className='absolute text-[10px] font-bold text-white'>{progressPercent}%</span>
        </div>
      </div>

      <h3 className='relative z-10 font-bold text-lg text-white leading-tight'>
        Ibadah Harian
      </h3>
      <p className='relative z-10 text-sm text-emerald-100/70 mt-1'>
        {taskProgress.completed} dari {taskProgress.total} target selesai
      </p>

      <div className='relative z-10 mt-3 flex items-center gap-1 text-xs font-semibold text-white/70'>
        Lihat detail <ChevronRight size={13} />
      </div>
    </div>
  );
};

export default DailyGoalTracker;
