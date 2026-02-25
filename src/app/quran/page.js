'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Book,
  Bookmark,
  BarChart2,
  AlertCircle,
  X,
} from 'lucide-react';
import useUser from '@/hooks/useUser';
import useQuranStorage from '@/hooks/useQuranStorage';
import { getReadingHistory } from '@/lib/quranTrackerService';
import LastReadBanner from '@/components/Quran/LastReadBanner';
import BookmarkCard from '@/components/Quran/BookmarkCard';

import KhatamPlanCard from '@/components/Quran/KhatamPlanCard';
import HeatmapStatsDrawer from '@/components/Quran/Drawer/HeatmapStatsDrawer';

const TABS = [
  { key: 'surah', label: 'Surah' },
  { key: 'juz', label: 'Juz' },
];

const JUZ_LIST = Array.from({ length: 30 }, (_, i) => i + 1);

export default function QuranIndex() {
  const router = useRouter();
  const { user } = useUser();
  const storage = useQuranStorage();

  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('surah');

  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [lastRead, setLastRead] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);
  const [reminderData, setReminderData] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const res = await fetch('https://equran.id/api/v2/surat');
        if (!res.ok) throw new Error('Gagal fetch data surah');
        const json = await res.json();
        setSurahs(json.data || []);
      } catch (err) {
        console.error('Error fetching surahs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await storage.loadQuranData();
      if (data.lastRead) setLastRead(data.lastRead);
      if (data.bookmarks) setBookmarks(data.bookmarks);
    };
    loadData();

    const history = getReadingHistory() || {};
    let totalSecs3Days = 0;
    let metTargetAnyDay = false;
    const today = new Date();

    for (let i = 0; i < 3; i++) {
      const d = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i,
        12,
        0,
        0,
      );
      const dateStr = d.toISOString().split('T')[0];
      const secs = history[dateStr] || 0;

      totalSecs3Days += secs;
      if (secs >= 180) metTargetAnyDay = true;
    }

    const avgSeconds = Math.floor(totalSecs3Days / 3);

    if (!metTargetAnyDay) {
      setReminderData({ avgSeconds });
    }
  }, [user]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (activeTab === 'juz') {
      const num = parseInt(val, 10);
      if (!isNaN(num) && num >= 1 && num <= 30) {
        router.push(`/quran/juz/${num}`);
      }
    }
  };

  const handleResetLastRead = async () => {
    await storage.saveLastRead(null);
    setLastRead(null);
  };

  const filteredSurahs = surahs.filter(
    (s) =>
      s.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.arti.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemoveBookmark = async (bookmarkToRemove) => {
    const newBookmarks = bookmarks.filter(
      (b) =>
        !(
          b.surahId === bookmarkToRemove.surahId &&
          b.ayahNumber === bookmarkToRemove.ayahNumber
        ),
    );
    setBookmarks(newBookmarks);
    await storage.saveBookmarksData(newBookmarks);
  };

  const handleContinue = () => {
    if (!lastRead) return;
    const url = lastRead.isJuz
      ? `/quran/juz/${lastRead.juzNumber || 1}#ayat-${lastRead.surahId}-${lastRead.ayahNumber}`
      : `/quran/surah/${lastRead.surahId}#ayat-${lastRead.ayahNumber}`;
    router.push(url);
  };

  const isSearching = searchQuery.trim().length > 0;

  const formatAvgTime = (secs) => {
    if (secs < 60) return `${secs} detik`;
    return `${Math.floor(secs / 60)} menit`;
  };

  if (view === 'bookmarks') {
    return (
      <div className='min-h-screen pb-24' style={{ background: 'var(--bg-page)' }}>
        <header className='sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800'>
          <div className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-5 py-3.5 flex items-center gap-3 dark:[background:rgba(13,27,46,0.9)]'>
            <button onClick={() => setView('home')} className='p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
              <ArrowLeft size={20} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <h1 className='font-bold text-lg flex items-center gap-2' style={{ color: '#1e3a8a' }}>
              <Bookmark size={20} /> Ayat Disimpan
            </h1>
          </div>
        </header>
        <main className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto p-5 md:py-6 lg:py-8 lg:px-6'>
          {bookmarks.length === 0 ? (
            <div className='text-center py-20' style={{ color: 'var(--text-muted)' }}>
              <Bookmark size={48} className='mx-auto mb-3 opacity-20' />
              <p className='text-sm font-medium'>Belum ada ayat yang disimpan.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
              {bookmarks.map((b, i) => (
                <BookmarkCard key={i} bookmark={b} onRemove={handleRemoveBookmark} />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className='min-h-screen pb-24 relative' style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <header className='sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800'>
        <div className='dark:!bg-[rgba(13,27,46,0.95)] max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 pt-3 pb-2'>
          {/* Row 1: back + title + actions */}
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-2'>
              <button onClick={() => router.push('/')} className='p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                <ArrowLeft size={20} style={{ color: 'var(--text-secondary)' }} />
              </button>
              <div className='flex items-center gap-1.5'>
                <span className='w-7 h-7 rounded-lg flex items-center justify-center' style={{ background: 'linear-gradient(135deg,#1e3a8a,#312e81)' }}>
                  <BookOpen size={14} className='text-white' />
                </span>
                <h1 className='font-extrabold text-base' style={{ color: '#1e3a8a' }}>Al-Qur&apos;an</h1>
              </div>
            </div>
            <div className='flex items-center gap-1.5'>
              <button onClick={() => setIsHeatmapOpen(true)} className='p-1.5 rounded-xl transition-colors' style={{ background: 'rgba(30,58,138,0.08)' }}>
                <BarChart2 size={16} style={{ color: '#1e3a8a' }} />
              </button>
              <button onClick={() => setView('bookmarks')} className='p-1.5 rounded-xl transition-colors' style={{ background: 'rgba(30,58,138,0.08)' }}>
                <Bookmark size={16} style={{ color: '#1e3a8a' }} />
              </button>
            </div>
          </div>

          {/* Row 2: Search + Tab toggle */}
          <div className='flex gap-2'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2' size={15} style={{ color: 'var(--text-muted)' }} />
              <input
                type={activeTab === 'juz' ? 'number' : 'text'}
                placeholder={activeTab === 'surah' ? 'Cari surah...' : 'Juz 1-30...'}
                className='w-full pl-9 pr-3 py-2 rounded-xl text-sm outline-none transition-all'
                style={{ background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1.5px solid transparent' }}
                onFocus={e => e.target.style.border = '1.5px solid #1e3a8a'}
                onBlur={e => e.target.style.border = '1.5px solid transparent'}
                onChange={handleSearchChange}
                value={searchQuery}
                min={activeTab === 'juz' ? 1 : undefined}
                max={activeTab === 'juz' ? 30 : undefined}
              />
            </div>
            {/* Surah / Juz toggle */}
            <div className='flex p-0.5 rounded-xl shrink-0' style={{ background: 'var(--bg-subtle)' }}>
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setActiveTab(key); setSearchQuery(''); }}
                  className='px-3 py-1.5 text-xs font-bold rounded-[10px] transition-all'
                  style={activeTab === key
                    ? { background: '#1e3a8a', color: 'white', boxShadow: '0 2px 8px rgba(30,58,138,0.3)' }
                    : { color: 'var(--text-muted)' }
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-5 py-5 md:py-6 lg:py-8'>
        {/* reminder */}
        {!isSearching && reminderData && (
          <div className='rounded-2xl p-4 mb-5 flex items-start gap-3 relative overflow-hidden' style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div className='p-2 rounded-xl text-amber-600' style={{ background: 'rgba(245,158,11,0.15)' }}>
              <AlertCircle size={18} />
            </div>
            <div className='pr-6'>
              <h3 className='font-bold text-sm mb-1' style={{ color: 'var(--text-primary)' }}>Jangan Lupa Sempatkan Waktu Ya!</h3>
              <p className='text-xs leading-relaxed' style={{ color: 'var(--text-secondary)' }}>
                Rata-rata bacamu hanya <strong>{formatAvgTime(reminderData.avgSeconds)}</strong>. Sempatkan tilawah hari ini!
              </p>
            </div>
            <button onClick={() => setReminderData(null)} className='absolute top-3 right-3 p-1 rounded-lg text-amber-500 hover:bg-amber-100 transition-colors'>
              <X size={14} />
            </button>
          </div>
        )}

        {!isSearching && (
          <div className='flex flex-col md:flex-row items-stretch gap-4 mb-5'>
            <div className='w-full md:w-4/12 flex [&>*]:w-full [&>*]:h-full'>
              <LastReadBanner lastRead={lastRead} onContinue={handleContinue} />
            </div>
            <div className='w-full md:w-8/12 flex [&>*]:w-full [&>*]:h-full'>
              <KhatamPlanCard onResetLastRead={handleResetLastRead} />
            </div>
          </div>
        )}

        {/* Surah tab */}
        {activeTab === 'surah' && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3'>
            {loading ? (
              [...Array(12)].map((_, i) => (
                <div key={i} className='h-[68px] skeleton rounded-2xl' />
              ))
            ) : filteredSurahs.length > 0 ? (
              filteredSurahs.map((s) => (
                <button
                  key={s.nomor}
                  onClick={() => router.push(`/quran/surah/${s.nomor}`)}
                  className='w-full text-left rounded-2xl px-3 py-3 flex items-center justify-between group active:scale-[0.98] transition-all duration-200 hover:-translate-y-0.5'
                  style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}
                >
                  <div className='flex items-center gap-2.5 min-w-0'>
                    {/* Number badge */}
                    <span
                      className='w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-xs font-extrabold'
                      style={{ background: 'linear-gradient(135deg,#1e3a8a,#312e81)', color: 'white', boxShadow: '0 3px 8px rgba(30,58,138,0.3)' }}
                    >
                      {s.nomor}
                    </span>
                    <div className='min-w-0'>
                      <h3 className='font-bold text-sm truncate' style={{ color: 'var(--text-primary)' }}>{s.namaLatin}</h3>
                      <p className='text-[10px] font-medium uppercase tracking-wide mt-0.5 truncate' style={{ color: 'var(--text-muted)' }}>
                        {s.tempatTurun} · {s.jumlahAyat} Ayat
                      </p>
                    </div>
                  </div>
                  {/* Arabic name — hidden on very small screens if name is long */}
                  <span
                    className='text-base font-arabic shrink-0 ml-2'
                    style={{ color: '#1e3a8a', opacity: 0.75, maxWidth: '80px', overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap' }}
                  >
                    {s.nama}
                  </span>
                </button>
              ))
            ) : (
              <div className='text-center py-10 col-span-full' style={{ color: 'var(--text-muted)' }}>
                <p className='text-sm'>Surah tidak ditemukan.</p>
              </div>
            )}
          </div>
        )}

        {/* Juz tab */}
        {activeTab === 'juz' && (
          <div className='grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3'>
            {JUZ_LIST.map((juz) => (
              <button
                key={juz}
                onClick={() => router.push(`/quran/juz/${juz}`)}
                className='rounded-2xl py-3 px-2 flex flex-col items-center justify-center gap-1.5 group active:scale-95 transition-all duration-200 hover:-translate-y-1'
                style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-card)', boxShadow: 'var(--shadow-card)' }}
              >
                <span
                  className='w-8 h-8 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 text-xs font-extrabold text-white'
                  style={{ background: 'linear-gradient(135deg,#1e3a8a,#312e81)', boxShadow: '0 3px 8px rgba(30,58,138,0.3)' }}
                >
                  {juz}
                </span>
                <span className='text-[10px] font-bold' style={{ color: 'var(--text-secondary)' }}>Juz</span>
              </button>
            ))}
          </div>
        )}
      </main>

      <HeatmapStatsDrawer
        isOpen={isHeatmapOpen}
        onClose={() => setIsHeatmapOpen(false)}
      />
    </div>
  );
}
