'use client';

import { RefreshCw, Quote } from 'lucide-react';

const QuoteCard = ({ quote, isSpinning, onRefresh }) => (
  <div
    className='relative rounded-[2rem] p-6 md:p-7 overflow-hidden text-white group transition-all duration-500 hover:-translate-y-1 h-full flex flex-col justify-center'
    style={{
      background: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #1e1b4b 100%)',
      boxShadow: '0 12px 40px rgba(30,58,138,0.4)',
    }}
  >
    {/* Ambient */}
    <div className='absolute inset-0 pointer-events-none'
      style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.25) 0%, transparent 65%)' }} />

    {/* Large decorative quote mark */}
    <Quote
      size={80}
      className='absolute -bottom-3 -right-3 pointer-events-none'
      style={{ color: 'rgba(255,255,255,0.04)' }}
    />

    <div className='relative z-10'>
      <div className='flex justify-between items-center mb-4'>
        <p className='text-[10px] uppercase tracking-[0.3em] text-blue-200/70 font-bold'>
          Quote of the Day
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); onRefresh(); }}
          className={`p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-blue-200 hover:text-white ${isSpinning ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <p className='text-[15px] md:text-base leading-relaxed font-medium text-white/90 min-h-[4rem]'>
        &ldquo;{quote.text}&rdquo;
      </p>

      <p className='mt-4 text-[11px] text-blue-200/50 font-medium'>
        {quote.source}
      </p>
    </div>
  </div>
);

export default QuoteCard;
