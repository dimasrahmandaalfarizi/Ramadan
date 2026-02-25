'use client';

import React from 'react';
import Image from 'next/image';
import { User, Edit3, MapPin, ShieldCheck } from 'lucide-react';

const UserProfileCard = ({ user, onEditProfile }) => {
  if (!user) {
    return (
      <div className='rounded-3xl overflow-hidden' style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)' }}>
        <div className='h-24 skeleton' />
        <div className='p-5 flex items-center gap-4'>
          <div className='w-16 h-16 rounded-2xl skeleton' />
          <div className='flex-1 space-y-2'>
            <div className='h-5 skeleton rounded-lg w-1/2' />
            <div className='h-4 skeleton rounded-lg w-1/3' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='rounded-3xl overflow-hidden relative' style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', boxShadow: 'var(--shadow-float)' }}>
      {/* Header Banner */}
      <div className='h-24 relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #0f1f5c 0%, #1a0a4a 50%, #0a0f2e 100%)' }}>
        {/* Stars */}
        {[[15,20],[70,15],[85,50],[40,70]].map(([l,t],i) => (
          <span key={i} className='absolute w-1 h-1 rounded-full bg-white/50 animate-pulse' style={{ left:`${l}%`, top:`${t}%` }} />
        ))}
        <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(90,120,255,0.2) 0%, transparent 60%)' }} />

        {/* Edit button */}
        <button
          onClick={onEditProfile}
          className='absolute top-3 right-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white'
        >
          <Edit3 size={15} />
        </button>
      </div>

      {/* Avatar — overlapping banner */}
      <div className='relative z-10 -mt-10 px-5 pb-5'>
        <div className='flex items-end justify-between'>
          <div
            className='w-20 h-20 rounded-2xl flex items-center justify-center text-white relative overflow-hidden shrink-0 ring-4 ring-white dark:ring-slate-900'
            style={{ background: 'linear-gradient(135deg, #1e3a8a, #312e81)', boxShadow: '0 8px 24px rgba(30,58,138,0.4)' }}
          >
            {user.avatar ? (
              <Image src={user.avatar} alt='Profile' fill className='object-cover' />
            ) : (
              <User size={30} />
            )}
          </div>
          <div className='mb-1'>
            <ShieldCheck size={20} className='text-blue-500' />
          </div>
        </div>

        {/* Name & location */}
        <div className='mt-3'>
          <h2 className='text-xl font-black truncate' style={{ color: 'var(--text-primary)' }}>
            {user.name || 'Hamba Allah'}
          </h2>
          <div className='flex items-center gap-1.5 mt-1'>
            <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
            <span className='text-xs font-semibold' style={{ color: 'var(--text-secondary)' }}>
              {user.location || 'Surabaya'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
