'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import { useViewport } from '@/hooks/useViewport';
import { useZakatCalc } from '@/hooks/useZakatCalc';
import SectionCard from '@/components/Zakat/SectionCard';
import ZakatFitrah from '@/components/Zakat/ZakatFitrah';
import ZakatMaal from '@/components/Zakat/ZakatMaal';
import ZakatPenghasilan from '@/components/Zakat/ZakatPenghasilan';
import ZakatEmasPerak from '@/components/Zakat/ZakatEmasPerak';

export default function ZakatPage() {
  const router = useRouter();
  const { isDesktop } = useViewport();
  const calc = useZakatCalc();

  // Accordion mobile: hanya satu section aktif sekaligus
  const [activeSection, setActiveSection] = useState('fitrah');
  const toggleSection = (id) => {
    if (!isDesktop) setActiveSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className='min-h-screen pb-24' style={{ background: 'var(--bg-page)' }}>

      <header className='sticky top-0 z-40 px-5 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800'>
        <div className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto flex items-center gap-3'>
          <button onClick={() => router.push('/')} className='p-2 -ml-2 rounded-xl hover:bg-slate-100 transition-colors'>
            <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
          </button>
          <div className='flex items-center gap-2'>
            <span className='w-8 h-8 rounded-xl flex items-center justify-center text-white'
              style={{ background: 'linear-gradient(135deg,#065f46,#059669)' }}>💰</span>
            <div>
              <h1 className='font-extrabold text-sm leading-tight' style={{ color: 'var(--text-primary)' }}>Kalkulator Zakat</h1>
              <p className='text-[10px]' style={{ color: 'var(--text-muted)' }}>Hitung zakat dengan mudah & akurat</p>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-md md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-5 pt-5 space-y-4'>
        {/* Hero banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a] to-indigo-700 dark:from-blue-800 dark:via-blue-800 dark:to-indigo-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden mb-6'
        >
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_60%)]' />
          <div className='absolute -bottom-8 -right-8 w-32 h-32 md:w-48 md:h-48 bg-white/5 rounded-full' />
          <div className='relative z-10 md:max-w-xl'>
            <p className='text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-blue-200 dark:text-blue-300 mb-2'>
              Panduan Zakat
            </p>
            <h2 className='text-xl md:text-3xl font-bold leading-snug mb-3'>
              Tunaikan zakat,
              <br />
              bersihkan harta 🤍
            </h2>
            <p className='text-xs md:text-sm text-blue-200 dark:text-blue-300 leading-relaxed md:w-3/4'>
              Zakat dihitung berdasarkan nisab (batas minimum) dan haul (1 tahun
              kepemilikan). Pilih jenis zakat di bawah.
            </p>
          </div>
        </motion.div>

        {/* Grid 2 kolom di md+ */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-start'>
          <SectionCard
            id='fitrah'
            activeId={activeSection}
            onToggle={toggleSection}
            icon='🍚'
            title='Zakat Fitrah'
            subtitle='Wajib setiap jiwa, dibayar sebelum Idul Fitri'
            accentClass='text-emerald-600 dark:text-emerald-400'
            bgClass='bg-emerald-50 dark:bg-emerald-900'
            isDesktop={isDesktop}
          >
            <ZakatFitrah data={calc.fitrah} />
          </SectionCard>

          <SectionCard
            id='maal'
            activeId={activeSection}
            onToggle={toggleSection}
            icon='💰'
            title='Zakat Maal (Harta)'
            subtitle='Tabungan, investasi & piutang selama 1 tahun'
            accentClass='text-[#1e3a8a] dark:text-blue-400'
            bgClass='bg-blue-50 dark:bg-blue-900'
            isDesktop={isDesktop}
          >
            <ZakatMaal data={calc.maal} />
          </SectionCard>

          <SectionCard
            id='penghasilan'
            activeId={activeSection}
            onToggle={toggleSection}
            icon='💼'
            title='Zakat Penghasilan'
            subtitle='Gaji & pendapatan bulanan'
            accentClass='text-violet-600 dark:text-violet-400'
            bgClass='bg-violet-50 dark:bg-violet-900'
            isDesktop={isDesktop}
          >
            <ZakatPenghasilan data={calc.penghasilan} />
          </SectionCard>

          <SectionCard
            id='emas'
            activeId={activeSection}
            onToggle={toggleSection}
            icon='✨'
            title='Zakat Emas & Perak'
            subtitle='Perhiasan & logam mulia yang tersimpan'
            accentClass='text-amber-600 dark:text-amber-400'
            bgClass='bg-amber-50 dark:bg-amber-900'
            isDesktop={isDesktop}
          >
            <ZakatEmasPerak data={calc.emasPerak} />
          </SectionCard>
        </div>

        {/* Footer disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-center pt-6 pb-4'
        >
          <p className='text-[10px] md:text-xs text-slate-300 dark:text-slate-600 leading-relaxed'>
            Kalkulator ini sebagai panduan. Untuk keputusan zakat yang lebih
            tepat,
            <br />
            konsultasikan dengan ustadz atau lembaga zakat terpercaya.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
