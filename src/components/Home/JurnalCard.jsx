'use client';

import { ChevronRight, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

const JurnalCard = ({ user }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(user ? '/jurnal' : '/auth/login')}
      className='relative rounded-[2rem] p-5 overflow-hidden cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 h-full flex flex-col'
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Gradient accent bar (left) */}
      <div
        className='absolute top-4 bottom-4 left-0 w-1 rounded-r-full pointer-events-none'
        style={{ background: 'linear-gradient(180deg, #3b82f6, #1e3a8a)' }}
      />

      {/* Background deco */}
      <div
        className='absolute -bottom-6 -right-6 w-28 h-28 rounded-full pointer-events-none opacity-[0.06] dark:opacity-[0.1]'
        style={{ background: '#1e3a8a' }}
      />
      <div
        className='absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none opacity-[0.04]'
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />

      <div className='relative z-10 pl-3 flex flex-col h-full'>
        {/* Badge */}
        <div className='flex items-center gap-2 mb-2'>
          <span className='w-7 h-7 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-900/30'>
            <PenLine size={14} className='text-blue-600 dark:text-blue-400' />
          </span>
          <span className='text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500'>
            Jurnal Harian
          </span>
        </div>

        <h3 className='font-bold text-sm leading-snug flex-1' style={{ color: 'var(--text-primary)' }}>
          Jurnal Refleksi
        </h3>
        <p className='text-[11px] mt-1 mb-3' style={{ color: 'var(--text-muted)' }}>
          Bagaimana perasaanmu hari ini?
        </p>

        <div className='flex items-center gap-0.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all'>
          Mulai menulis <ChevronRight size={12} className='group-hover:translate-x-0.5 transition-transform' />
        </div>
      </div>
    </div>
  );
};

export default JurnalCard;
