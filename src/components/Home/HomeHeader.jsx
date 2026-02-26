'use client';

import { Bell, User, Moon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomeHeader = ({ user, hijriDate, hasUnreadNotif, onOpenNotification }) => {
  const router = useRouter();

  // Greeting berdasarkan jam
  const hour = new Date().getHours();
  const greeting =
    hour < 4  ? 'Selamat Malam 🌙' :
    hour < 11 ? 'Selamat Pagi ☀️' :
    hour < 15 ? 'Selamat Siang 🌤️' :
    hour < 18 ? 'Selamat Sore 🌅' : 'Selamat Malam 🌙';

  return (
    <header className='flex justify-between items-start mb-6 mt-1'>
      {/* Left: greeting + name */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-1'>
          <span
            className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider'
            style={{ background: 'rgba(30,58,138,0.08)', color: '#2563eb' }}
          >
            <Moon size={9} />
            {hijriDate}
          </span>
        </div>
        <p className='text-[11px] md:text-xs font-medium mb-0.5' style={{ color: 'var(--text-muted)' }}>
          {greeting}
        </p>
        <h1
          className='text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight truncate'
          style={{ color: 'var(--text-primary)' }}
        >
          {user?.name ? (
            <>
              <span style={{ color: 'var(--text-secondary)' }}>Assalamu&apos;alaikum, </span>
              <span style={{ color: '#1e3a8a' }} className='dark:text-blue-400'>{user.name} 👋</span>
            </>
          ) : (
            <span style={{ color: '#1e3a8a' }} className='dark:text-blue-400'>Assalamu&apos;alaikum 👋</span>
          )}
        </h1>
      </div>

      {/* Right: bell + avatar */}
      <div className='flex gap-2.5 items-center ml-3 shrink-0'>
        {/* Notification bell */}
        <button
          onClick={onOpenNotification}
          className='relative w-10 h-10 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform'
          style={{
            background: 'var(--bg-card)',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid var(--border-card)',
          }}
          aria-label='Notifikasi'
        >
          <Bell size={17} style={{ color: 'var(--text-secondary)' }} />
          {hasUnreadNotif && (
            <span className='absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse' />
          )}
        </button>

        {/* Avatar */}
        <button
          onClick={() => router.push('/user')}
          className='w-10 h-10 md:w-11 md:h-11 rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform overflow-hidden relative ring-2 ring-blue-200/40 dark:ring-blue-800/40'
          style={{
            background: 'linear-gradient(135deg, #1e3a8a, #3b5bdb)',
            boxShadow: '0 4px 14px rgba(30,58,138,0.35)',
          }}
          aria-label='Profil'
        >
          {user?.avatar ? (
            <Image src={user.avatar} alt='Avatar' fill className='object-cover' />
          ) : (
            <User size={17} className='text-white' />
          )}
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
