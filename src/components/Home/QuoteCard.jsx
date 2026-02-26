'use client';

import { RefreshCw } from 'lucide-react';
import ShareButton from '@/components/_shared/ShareButton';

const QuoteCard = ({ quote, isSpinning, onRefresh }) => (
  <div
    className='card-lift-dark relative rounded-[2rem] p-6 overflow-hidden text-white flex flex-col justify-between'
    style={{
      background: 'linear-gradient(135deg, #0c1445 0%, #1a2a6c 45%, #1e1b4b 100%)',
      boxShadow: '0 12px 40px rgba(30,58,138,0.4)',
      border: '1px solid rgba(99,102,241,0.12)',
    }}
  >
    {/* Ambient glow */}
    <div className='absolute inset-0 pointer-events-none'
      style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(99,102,241,0.2) 0%, transparent 65%)' }} />

    {/* Islamic calligraphy deco (bismillah-style dots) */}
    {[
      { top: '12%', left: '85%' }, { top: '25%', left: '92%' },
      { top: '75%', left: '8%' },  { top: '88%', left: '15%' },
    ].map((s, i) => (
      <span key={i} className='absolute w-1 h-1 rounded-full bg-indigo-400/30 pointer-events-none'
        style={{ top: s.top, left: s.left }} />
    ))}

    {/* Large decorative Arabic opening quote */}
    <span
      className='absolute bottom-2 right-4 pointer-events-none select-none'
      style={{
        fontFamily: '"Amiri", serif',
        fontSize: '6rem',
        lineHeight: 1,
        color: 'rgba(99,102,241,0.08)',
        fontWeight: 700,
      }}
    >
      ❝
    </span>

    {/* Header */}
    <div className='relative z-10 flex justify-between items-center mb-4'>
      <p className='text-[10px] uppercase tracking-[0.3em] text-indigo-300/60 font-bold'>
        Quote of the Day
      </p>
      <button
        onClick={(e) => { e.stopPropagation(); onRefresh(); }}
        className={`p-2 rounded-xl text-indigo-300/60 hover:text-white transition-all hover:bg-white/10 ${isSpinning ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-500'}`}
        aria-label='Refresh quote'
      >
        <RefreshCw size={13} />
      </button>
    </div>

    {/* Quote text */}
    <p className='relative z-10 text-[14px] md:text-[15px] leading-relaxed font-medium text-white/85 flex-1 mb-4'>
      &ldquo;{quote?.text}&rdquo;
    </p>

    {/* Source + Share */}
    <div className='relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-3 gap-3'>
      <p className='text-[11px] text-indigo-300/50 font-medium'>
        — {quote?.source}
      </p>
      <ShareButton
        text={`"${quote?.text}"`}
        label={`— ${quote?.source}`}
        className='bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
      />
    </div>
  </div>
);

export default QuoteCard;
