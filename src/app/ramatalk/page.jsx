'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import {
  ArrowLeft,
  Send,
  Sparkles,
  User,
  Bot,
  MessageCircle,
  Heart,
  BookOpen,
  Scale,
  ScrollText,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

dayjs.locale('id');

const RAMATALK_MODES = [
  { id: 'ngobrol', label: 'Ngobrol', icon: MessageCircle },
  { id: 'doa', label: 'Cari Doa', icon: Heart },
  { id: 'surah', label: 'Cari Surah', icon: BookOpen },
  { id: 'fiqih', label: 'Tanya Fiqih', icon: Scale },
  { id: 'hadits', label: 'Cari Hadits', icon: ScrollText },
];

function RamatalkContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState('ngobrol');
  const [journalContext, setJournalContext] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const mode = searchParams.get('mode');
    const q = searchParams.get('q');

    if (mode && RAMATALK_MODES.find((m) => m.id === mode)) {
      setActiveMode(mode);
    }

    if (q) {
      setInput(q);
    }
  }, [searchParams]);

  useEffect(() => {
    const savedContext = sessionStorage.getItem('ramatalk_journal_context');
    if (savedContext) {
      try {
        const parsedContext = JSON.parse(savedContext);
        setJournalContext(parsedContext);

        setMessages([
          {
            id: 1,
            role: 'ai',
            text: `Halo! 👋\nAku lihat kamu baru saja menulis catatan berjudul "${parsedContext.title}". Ada yang mau diceritakan lebih lanjut tentang perasaanmu? Aku siap dengerin. 🤍`,
          },
        ]);
        sessionStorage.removeItem('ramatalk_journal_context');
      } catch (error) {
        console.error(error);
      }
    } else {
      setMessages([
        {
          id: 1,
          role: 'ai',
          text: 'Assalamualaikum! 👋\nAku Ramatalk. Mau ngobrol santai atau cari info ibadah spesifik? Pilih mode di atas dan tanyain aja ke aku!',
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMessage = { id: Date.now(), role: 'user', text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const now = dayjs();
    const currentHour = now.hour();
    const greeting =
      currentHour < 11
        ? 'Pagi'
        : currentHour < 15
          ? 'Siang'
          : currentHour < 18
            ? 'Sore'
            : 'Malam';
    const ramadhanStart = dayjs('2026-02-19');
    const dayDiff = now.diff(ramadhanStart, 'day') + 1;
    const currentDay = dayDiff > 0 ? dayDiff : 0;

    try {
      const res = await fetch('/api/ramatalk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          context: {
            timeString: now.format('HH:mm'),
            greeting,
            day: currentDay,
            mode: activeMode,
            journalContext: journalContext
              ? `User baru saja menulis Jurnal: "${journalContext.title}". Isinya: "${journalContext.content}".`
              : null,
          },
        }),
      });

      const data = await res.json();
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        text: data.reply || 'Maaf, aku bingung jawabnya. Coba tanya lain? 🤔',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: 'Yah, koneksi terputus. Cek internetmu ya.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col' style={{ background: 'var(--bg-page)' }}>
      {/* Header */}
      <header className='sticky top-0 z-40 px-4 py-3 flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800'>
        <button onClick={() => router.push('/')} className='p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
          <ArrowLeft size={20} style={{ color: 'var(--text-secondary)' }} />
        </button>

        <div className='flex items-center gap-1.5 flex-1'>
          <span className='w-7 h-7 rounded-lg flex items-center justify-center shrink-0'
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}>
            <Sparkles size={14} className='text-white' />
          </span>
          <div>
            <h1 className='font-extrabold text-base leading-tight' style={{ color: '#4f46e5' }}>Ramatalk AI</h1>
            <div className='flex items-center gap-1'>
              <span className='w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse' />
              <p className='text-[10px] font-medium' style={{ color: 'var(--text-muted)' }}>Online</p>
            </div>
          </div>
        </div>
      </header>

      {/* Mode chips */}
      <div className='py-2 px-4 flex gap-2 overflow-x-auto custom-scrollbar sticky top-[60px] z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800'>
        {RAMATALK_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all active:scale-95'
            style={activeMode === mode.id
              ? { background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', color: 'white', boxShadow: '0 4px 12px rgba(79,70,229,0.35)' }
              : { background: 'var(--bg-subtle)', color: 'var(--text-secondary)', border: '1px solid var(--border-light)' }
            }
          >
            <mode.icon size={13} />
            {mode.label}
          </button>
        ))}
      </div>

      <main className='flex-1 p-4 space-y-4 pb-44 overflow-y-auto'>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 ${
              msg.role === 'user'
                ? 'text-white'
                : 'text-indigo-600'
            }`}
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#1e3a8a,#312e81)' }
                : { background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }
              }>
              {msg.role === 'user' ? <User size={15} /> : <Bot size={16} />}
            </div>

            <div
              className='max-w-[85%] p-3.5 rounded-2xl text-[13.5px] leading-relaxed shadow-sm whitespace-pre-wrap'
              style={msg.role === 'user'
                ? { background: 'linear-gradient(135deg,#1e3a8a,#312e81)', color: 'white', borderTopRightRadius: '4px' }
                : { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-card)', borderTopLeftRadius: '4px', boxShadow: 'var(--shadow-card)' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className='flex items-end gap-2'>
            <div className='w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center'>
              <Bot size={18} className='text-indigo-600 dark:text-indigo-300' />
            </div>
            <div className='bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500 flex gap-1'>
              <span className='animate-bounce'>.</span>
              <span
                className='animate-bounce'
                style={{ animationDelay: '0.2s' }}
              >
                .
              </span>
              <span
                className='animate-bounce'
                style={{ animationDelay: '0.4s' }}
              >
                .
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <div className='fixed bottom-14 left-0 right-0 p-3 pb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800'>
        <form onSubmit={handleSend} className='max-w-md mx-auto relative flex items-center gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Mode ${RAMATALK_MODES.find((m) => m.id === activeMode)?.label}...`}
            className='w-full rounded-2xl py-3 pl-4 pr-12 text-sm outline-none transition-all'
            style={{ background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1.5px solid transparent' }}
            onFocus={e => e.target.style.border = '1.5px solid #4f46e5'}
            onBlur={e => e.target.style.border = '1.5px solid transparent'}
            disabled={isLoading}
          />
          <button
            type='submit'
            disabled={isLoading || !input.trim()}
            className='absolute right-2 p-2.5 rounded-xl text-white disabled:opacity-40 transition-all active:scale-90'
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 4px 12px rgba(79,70,229,0.4)' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RamatalkPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className='min-h-screen bg-[#F6F9FC] dark:bg-slate-950 flex items-center justify-center text-slate-500'>
            Memuat asisten...
          </div>
        }
      >
        <RamatalkContent />
      </Suspense>
    </ProtectedRoute>
  );
}
