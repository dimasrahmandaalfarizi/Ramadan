'use client';

import { Bell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomeHeader = ({ user, hijriDate, hasUnreadNotif, onOpenNotification }) => {
  const router = useRouter();

  return (
    <header className='flex justify-between items-center mb-8 mt-2 md:mb-10'>
      <div>
        <span
          className='inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2'
          style={{ background: 'rgba(30,58,138,0.08)', color: '#1e3a8a' }}
        >
          {hijriDate}
        </span>
        <h1 className='text-2xl md:text-3xl font-extrabold tracking-tight leading-tight' style={{ color: 'var(--text-primary)' }}>
          Assalamu&apos;alaikum 👋<br />
          <span style={{ color: '#1e3a8a' }}>
            {user?.name || 'Sahabat!'}
          </span>
        </h1>
      </div>

      <div className='flex gap-3 md:gap-4 items-center'>
        {/* Notification bell */}
        <button
          onClick={onOpenNotification}
          className='relative w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform'
          style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border-card)' }}
        >
          <Bell size={18} style={{ color: 'var(--text-secondary)' }} />
          {hasUnreadNotif && (
            <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse' />
          )}
        </button>

        {/* Avatar */}
        <button
          onClick={() => router.push('/user')}
          className='w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform overflow-hidden relative'
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #312e81)',
            boxShadow: '0 4px 12px rgba(30,58,138,0.3)',
          }}
        >
          {user?.avatar ? (
            <Image src={user.avatar} alt='Avatar' fill className='object-cover' />
          ) : (
            <User size={18} className='text-white' />
          )}
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
