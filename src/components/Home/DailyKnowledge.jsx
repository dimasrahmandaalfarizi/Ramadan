'use client';

import { ChevronRight, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DailyKnowledge = ({ hijriDay, dailyTopic }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/study/${hijriDay}`)}
      className='relative rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:-translate-y-1'
      style={{
        background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)',
        boxShadow: '0 8px 32px rgba(180,83,9,0.3)',
      }}
    >
      {/* Ambient glow */}
      <div className='absolute -bottom-8 -right-8 w-36 h-36 rounded-full pointer-events-none opacity-20'
        style={{ background: 'radial-gradient(circle, #fcd34d 0%, transparent 70%)' }} />

      <div className='relative z-10 flex items-center gap-2 mb-3'>
        <span className='p-1.5 rounded-xl bg-white/20'>
          <Lightbulb size={16} className='text-amber-200' />
        </span>
        <span className='text-[10px] uppercase tracking-widest font-bold text-amber-200/80'>
          Daily Knowledge
        </span>
      </div>

      <h3 className='relative z-10 font-bold text-white text-sm md:text-base leading-snug'>
        {dailyTopic?.title}
      </h3>

      <div className='relative z-10 mt-3 flex items-center gap-1 text-xs font-semibold text-amber-200/70'>
        Baca selengkapnya <ChevronRight size={13} />
      </div>
    </div>
  );
};

export default DailyKnowledge;
