'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Search,
  ScrollText,
  Bookmark,
  Book,
  X,
  BookOpen,
} from 'lucide-react';
import { haditsRamadhanData } from '@/data/hadist';

/**
 * HaditsHomeView — tampilan beranda Hadits.
 * Berisi banner terakhir dibaca, search lokal dari hadist.js,
 * dan grid seluruh kitab hadits.
 *
 * @prop {Array}    books
 * @prop {boolean}  loadingBooks
 * @prop {object|null} lastRead       - { bookName, number, bookId, page }
 * @prop {string}   searchQuery
 * @prop {Function} setSearchQuery
 * @prop {Function} onOpenBook        - (book) => void
 * @prop {Function} onOpenBookmarks   - () => void
 * @prop {Array}    allBooks          - Seluruh books (untuk resolve lastRead.bookId)
 */
const HaditsHomeView = ({
  books,
  loadingBooks,
  lastRead,
  searchQuery,
  setSearchQuery,
  onOpenBook,
  onOpenBookmarks,
  allBooks,
}) => {
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);

  /* ── Filter hadist lokal ── */
  const searchResults =
    searchQuery.trim().length >= 2
      ? haditsRamadhanData.filter((h) => {
          const q = searchQuery.toLowerCase();
          return (
            h.title.toLowerCase().includes(q) ||
            h.content.toLowerCase().includes(q) ||
            h.source.toLowerCase().includes(q)
          );
        })
      : [];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className='min-h-screen bg-[#F6F9FC] dark:bg-slate-900 text-slate-800 dark:text-slate-100 pb-20 selection:bg-emerald-200 dark:selection:bg-emerald-900'>
      {/* Header sticky */}
      <header className='sticky top-0 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 px-6 py-4'>
        <div className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              <button
                onClick={() => router.push('/')}
                className='p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'
              >
                <ArrowLeft
                  size={20}
                  className='text-slate-600 dark:text-slate-400'
                />
              </button>
              <h1 className='font-bold text-xl flex items-center gap-2'>
                <ScrollText
                  size={24}
                  className='text-emerald-600 dark:text-emerald-400'
                />
                Hadits
              </h1>
            </div>
            <button
              onClick={onOpenBookmarks}
              className='p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-colors'
            >
              <Bookmark size={20} />
            </button>
          </div>

          {/* Search lokal */}
          <div className='relative'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500'
              size={18}
            />
            <input
              type='text'
              placeholder='Cari hadits (misal: Sabar, Puasa, Ramadhan)...'
              className='w-full pl-12 pr-10 py-3 bg-slate-100 dark:bg-slate-700 rounded-2xl border-none focus:ring-2 focus:ring-emerald-400 outline-none text-sm transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500'
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />
            {searchQuery.length > 0 && (
              <button
                onClick={handleClearSearch}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors'
              >
                <X size={15} className='text-slate-400 dark:text-slate-500' />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto p-5 md:py-8'>

        {/* ── Hasil Pencarian ── */}
        {showResults && searchQuery.trim().length >= 2 ? (
          <>
            <div className='flex items-center gap-2 mb-4'>
              <Search size={16} className='text-emerald-500' />
              <p className='text-sm font-semibold text-slate-600 dark:text-slate-300'>
                {searchResults.length > 0
                  ? `${searchResults.length} hadits ditemukan untuk "${searchQuery}"`
                  : `Tidak ada hadits untuk "${searchQuery}"`}
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <BookOpen size={48} className='text-slate-200 dark:text-slate-700 mb-4' />
                <p className='text-slate-400 dark:text-slate-500 text-sm'>
                  Coba kata kunci lain, seperti{' '}
                  <span className='font-semibold text-emerald-500'>puasa</span>,{' '}
                  <span className='font-semibold text-emerald-500'>sahur</span>, atau{' '}
                  <span className='font-semibold text-emerald-500'>lailatul qadar</span>.
                </p>
              </div>
            ) : (
              <div className='space-y-3'>
                {searchResults.map((hadits, idx) => (
                  <div
                    key={idx}
                    className='bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm'
                  >
                    <h3 className='font-bold text-sm text-emerald-600 dark:text-emerald-400 mb-1'>
                      {hadits.title}
                    </h3>
                    <p className='text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2'>
                      {hadits.content}
                    </p>
                    <p className='text-[11px] font-medium text-slate-400 dark:text-slate-500'>
                      {hadits.source}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Banner terakhir dibaca */}
            {lastRead && (
              <div className='mb-6 md:mb-8 md:max-w-2xl bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] p-5 md:p-8 text-white shadow-lg relative overflow-hidden'>
                <ScrollText
                  className='absolute -right-4 -bottom-4 opacity-20'
                  size={100}
                />
                <div className='relative z-10'>
                  <p className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-100 mb-1'>
                    Terakhir Dibaca
                  </p>
                  <h3 className='font-bold text-xl md:text-3xl mb-1 md:mb-2'>
                    {lastRead.bookName}
                  </h3>
                  <p className='text-sm md:text-base text-emerald-50 mb-4 md:mb-6'>
                    Hadits No. {lastRead.number}
                  </p>
                  <button
                    onClick={() => {
                      const book = allBooks.find((b) => b.id === lastRead.bookId);
                      if (book) onOpenBook(book, lastRead.page);
                    }}
                    className='bg-white text-emerald-600 text-xs md:text-sm font-bold px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-emerald-50 transition-colors shadow-sm'
                  >
                    Lanjutkan Membaca
                  </button>
                </div>
              </div>
            )}

            {/* Label section */}
            <div className='flex items-center gap-2 mb-4 md:mb-6'>
              <Book size={18} className='text-slate-400 dark:text-slate-500' />
              <h2 className='font-bold text-slate-700 dark:text-slate-300 md:text-lg'>
                Jelajahi Kitab
              </h2>
            </div>

            {/* Grid kitab */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5'>
              {loadingBooks
                ? [...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className='h-24 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl'
                    />
                  ))
                : books.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => onOpenBook(book)}
                      className='bg-white dark:bg-slate-800 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-700 transition-all cursor-pointer flex flex-col justify-center h-full min-h-[100px] group'
                    >
                      <h3 className='font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 leading-tight mb-1'>
                        {book.name}
                      </h3>
                      <p className='text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500'>
                        {book.available.toLocaleString('id-ID')} Hadits
                      </p>
                    </div>
                  ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HaditsHomeView;
