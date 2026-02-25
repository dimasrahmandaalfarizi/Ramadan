'use client';

import { Sparkles, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RamaTalkCard = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/ramatalk')}
      className='relative rounded-[2rem] p-5 md:p-6 overflow-hidden cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:-translate-y-1'
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
        boxShadow: '0 8px 32px rgba(79,70,229,0.35)',
      }}
    >
      {/* Radial glow */}
      <div className='absolute inset-0 pointer-events-none'
        style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(167,139,250,0.2) 0%, transparent 60%)' }} />

      {/* Sparkle dots */}
      {[
        { top:'15%', left:'80%', size:3 },
        { top:'60%', left:'90%', size:2 },
        { top:'80%', left:'70%', size:2 },
      ].map((s,i) => (
        <span key={i} className='absolute rounded-full bg-white/50 pointer-events-none animate-pulse'
          style={{ top:s.top, left:s.left, width:s.size, height:s.size }} />
      ))}

      <div className='relative z-10 flex items-center gap-2 mb-3'>
        <span className='p-1.5 rounded-xl bg-white/15'>
          <Sparkles size={15} className='text-violet-200' />
        </span>
        <span className='text-[10px] uppercase tracking-widest font-bold text-violet-200/80'>
          RamaTalk AI
        </span>
      </div>

      <h3 className='relative z-10 font-bold text-white text-base leading-snug'>
        Tanya Seputar Ibadah
      </h3>
      <p className='relative z-10 text-xs text-indigo-200/70 mt-1 leading-relaxed'>
        Fiqih, doa, atau hukum puasa? RamaTalk siap membantu 🤍
      </p>

      <div className='relative z-10 mt-3 flex items-center gap-1 text-xs font-semibold text-violet-300/80'>
        Mulai ngobrol <ChevronRight size={13} />
      </div>
    </div>
  );
};

export default RamaTalkCard;
