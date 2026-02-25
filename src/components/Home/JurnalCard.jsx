'use client';

import { ChevronRight, PenLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

const JurnalCard = ({ user }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(user ? '/jurnal' : '/auth/login');
  };

  return (
    <div
      onClick={handleClick}
      className='relative bg-white dark:bg-[#0D1B2E] rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:-translate-y-1'
      style={{
        border: '1px solid rgba(148,163,184,0.15)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      }}
    >
      {/* Accent bar */}
      <div className='absolute top-0 left-0 w-1 h-full rounded-l-[2rem]'
        style={{ background: 'linear-gradient(180deg, #3B5FCC, #1E3A8A)' }} />

      {/* Deco */}
      <div className='absolute -bottom-6 -right-6 w-28 h-28 rounded-full pointer-events-none opacity-[0.04] dark:opacity-[0.07]'
        style={{ background: '#1e3a8a' }} />

      <div className='relative z-10 pl-2'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='p-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/30'>
            <PenLine size={16} className='text-blue-600 dark:text-blue-400' />
          </span>
          <span className='text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500'>
            Jurnal Harian
          </span>
        </div>

        <h3 className='font-bold text-slate-800 dark:text-slate-100 text-base leading-snug'>
          Jurnal Refleksi
        </h3>
        <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>
          Bagaimana perasaanmu hari ini?
        </p>

        <div className='mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1'>
          Mulai menulis <ChevronRight size={13} />
        </div>
      </div>
    </div>
  );
};

export default JurnalCard;
