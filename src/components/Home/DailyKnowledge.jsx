'use client';

import { ChevronRight, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DailyKnowledge = ({ hijriDay, dailyTopic }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/study/${hijriDay}`)}
      className='card-lift-dark relative rounded-[2rem] p-5 overflow-hidden cursor-pointer h-full flex flex-col'
      style={{
        background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)',
        boxShadow: '0 10px 36px rgba(120,53,15,0.4)',
        border: '1px solid rgba(251,191,36,0.1)',
      }}
    >
      {/* Glow */}
      <div className='absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.25) 0%, transparent 70%)' }} />

      {/* Star deco */}
      {[
        { top: '15%', left: '80%', size: 2 },
        { top: '55%', left: '90%', size: 1.5 },
        { top: '80%', left: '70%', size: 2.5 },
      ].map((s, i) => (
        <span key={i} className='absolute rounded-full bg-amber-200/40 pointer-events-none'
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }} />
      ))}

      {/* Header badge */}
      <div className='relative z-10 flex items-center gap-2 mb-3'>
        <span className='w-7 h-7 rounded-xl flex items-center justify-center' style={{ background: 'rgba(252,211,77,0.2)' }}>
          <Lightbulb size={14} className='text-amber-300' />
        </span>
        <span className='text-[10px] uppercase tracking-widest font-bold text-amber-300/60'>
          Daily Knowledge
        </span>
      </div>

      {/* Title */}
      <h3 className='relative z-10 font-bold text-white text-sm leading-snug flex-1'>
        {dailyTopic?.title}
      </h3>

      {/* CTA */}
      <div className='relative z-10 mt-3 flex items-center gap-0.5 text-[11px] font-semibold text-amber-300/60 group-hover:text-amber-300 transition-colors'>
        Baca selengkapnya
        <ChevronRight size={12} className='group-hover:translate-x-0.5 transition-transform' />
      </div>
    </div>
  );
};

export default DailyKnowledge;
